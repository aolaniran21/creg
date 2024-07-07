import nodemailer from "nodemailer";
import Email from "./email.entity";

import { EmailTemplate } from "./email.interface";
import "dotenv/config";
import {
  VerificationData,
  SubmitResetPassword,
  RequestResetPassword,
  PaystackVerification,
  DeactivateEnrolee,
  ActivateEnrolee,
  PendingPayment,
  SuccessPayment,
  InsuranceActive,
  SuccessRegister,
  AdminSuccessRegister,
} from "./email.interface";

import { logInfo, logError } from "./../../logger.service";
import * as Sentry from "@sentry/node";

class EmailService {
  private mailchimpClient;
  private transporter: nodemailer.Transporter;

  constructor() {
    this.mailchimpClient = require("@mailchimp/mailchimp_transactional")(
      process.env.MAILCHIMP_API_KEY || ""
    );
    

    const { SENDER_EMAIL, SENDER_PASS } = process.env;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASS,
      },
    });
  }

  private injectSubstitute(
    raw: string,
    tags: string[],
    data:
      | VerificationData
      | RequestResetPassword
      | SubmitResetPassword
      | PaystackVerification
      | DeactivateEnrolee
      | ActivateEnrolee
      | PendingPayment
      | SuccessPayment
      | InsuranceActive
      | SuccessRegister
      | AdminSuccessRegister
  ): string {
    tags.forEach((tag) => {
      if (data[tag] !== undefined) {
        raw = raw.replace(new RegExp(`{{{${tag}}}}`, "g"), data[tag]);
      }
    });
    return raw;
  }

  private async getTemplate(slug: string): Promise<EmailTemplate | null> {
    const template = await Email.findOne({
      where: {
        slug,
      },
    });

    return template ? (template.get({ plain: true }) as EmailTemplate) : null;
  }
  private async checkHourlyQuota() {
    try {
      const response = await this.mailchimpClient.users.info();
      return response
    } catch (error) {
      Sentry.captureException(error);
    }
  }
  private async sendToMailchimp(
    email: string,
    subject: string,
    html: string
  ): Promise<{ success: boolean; queued: boolean; message?: string }> {
    const message = {
      from_email: process.env.MAILCHIMP_FROM_EMAIL || "",
      to: [
        {
          email: email,
          type: "to",
        },
      ],
      subject: subject,
      html: html,
    };

    try {
      const hourly = await this.checkHourlyQuota()
    
      // if(hourly.hourly_quota === 0){
      //   console.log(hourly)
      //   console.log(hourly.backlog)
      //   console.log(hourly.hourly_quota)
      //   console.log("well")
        const response = await this.mailchimpClient.messages.send({ message });
        console.log(response)

        if (response[0]?.status === "sent") {
          return {
            success: true,
            queued: false,
            message: "email sent successfully",
          };
        } else if (response[0]?.status === "queued") {
          return {
            success: true,
            queued: true,
            message: "email sent successfully",
          };
        } else {
          return {
            success: false,
            queued: false,
            message: "email not sent",
          };
        }
      // }else{
      //   return {
      //     success: false,
      //     queued: false,
      //     message: "Error sending email",
      //   };
      // }
    } catch (error) {
      Sentry.captureException(error);
      if (
        error?.response?.data?.code === 401 &&
        error?.response?.data?.name === "Invalid_Key"
      ) {
        return { success: false, queued: false, message: "Invalid Mailchimp API key" };
      } else {
        return {
          success: false,
          queued: false,
          message: "Error sending email",
        };
      }
    }
  }

  public async sendMail(
    slug: string,
    email: string,
    data?:
      | VerificationData
      | RequestResetPassword
      | SubmitResetPassword
      | PaystackVerification
      | DeactivateEnrolee
      | ActivateEnrolee
      | PendingPayment
      | SuccessPayment
      | InsuranceActive
      | SuccessRegister
  ) {
    try {
      const emailTemplate = await this.getTemplate(slug);

      if (!emailTemplate) {
        return {
          success: false,
          message: "Template not found",
        };
      }

      emailTemplate.subject = this.injectSubstitute(
        emailTemplate.subject,
        emailTemplate.tag.split(","),
        data
      );
      emailTemplate.html = this.injectSubstitute(
        emailTemplate.html,
        emailTemplate.tag.split(","),
        data
      );

      const mailchimpResult = await this.sendToMailchimp(
        email,
        emailTemplate.subject,
        emailTemplate.html
      );

      if (mailchimpResult.success && !mailchimpResult.queued) {
        return {
          success: true,
          queued: false,
          message: "Email sent successfully",
          data: mailchimpResult,
        };
      } else if (mailchimpResult.success && mailchimpResult.queued) {
        return {
          success: true,
          queued: true,
          message: "Email sent queued",
          // data: mailchimpResult,
        };
      } else {
        // return {
        //   success: false,
        //   queued: false,
        //   message: "Failed to send  email",
        // };
        const fallbackResult = await this.sendFallbackEmail(
          email,
          emailTemplate.subject,
          emailTemplate.html
        );
        return fallbackResult;
      }
    } catch (error) {
      Sentry.captureException(error);
      return {
        success: false,
        queued: false,
        message: "Failed to send  email",
        error,
      };
    }
  }

  private async sendFallbackEmail(
    email: string,
    subject: string,
    html: string
  ): Promise<{ success: boolean; queued?: boolean; message?: string }> {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: subject,
        html: html,
      };

      logInfo("using fallback email service");
      const res = await this.transporter.sendMail(mailOptions);
      console.log(res)

      return { success: true, queued: false, message: "Fallback email sent successfully" };
    } catch (error) {
      Sentry.captureException(error);
      logError("Error sending fallback email:" + error);
      return {
        success: false,
        message: "Fallback email sending failed",
      };
    }
  }
}

export default new EmailService();
