import express, { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import { ICreateUser, ICredential } from "./../entity/users/user.interface";
import { SubmitResetPassword } from "./../entity/email/email.interface";
import AuthResponseMsg from "./authsuccessmsg";
import { UserRoles } from "../entity/users/user.enum";
import HttpExceptions from "../exceptions/HttpExceptions";
import "dotenv/config";
import { logError, logInfo } from "./../logger.service";
// import NovuService from "../services/novu/novu.service";
// import NovuHelper from "../helpers/novu.helpers";
import { getGoogleUserInfo } from "../helpers/google.helpers";
import Joi from "joi";

const createUserSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.ref("password"),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  gender: Joi.string().required(),
});

const createAdminSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/[A-Z]/, "upper-case")
    .regex(/[a-z]/, "lower-case")
    .regex(/[^\w]/, "special character")
    .regex(/[0-9]/, "number")
    .required()
    .messages({
      "string.pattern.base":
        "Password must be alphanumeric and at least 8 characters long, at least one letter, one number and one special character",
    }),
  confirm_password: Joi.ref("password"),
  phone: Joi.string().required(),
  // gender: Joi.string().valid("Male", "Female").required().messages({
  //   "any.only": 'Gender must be either "Male" or "Female"',
  // }),
  role: Joi.string().valid("ADMIN", "WEB MASTER", "SUPER ADMIN"),
});

export default class AuthController {
  public path = "/auth";
  public router = express.Router();
  private authService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/google`, this.googleLogin);
    this.router.post(`${this.path}/verify`, this.verify);
    this.router.post(`${this.path}/request-reset`, this.requestPasswordReset);
    this.router.post(`${this.path}/submit-reset`, this.submitPasswordReset);
    this.router.post(
      `${this.path}/reverify`,
      this.resendVerificationToken
    );
    this.router.post(
      `${this.path}/resend-verification`,
      this.resendAdminVerificationToken
    );

    this.router.post(`${this.path}/register-admin`, this.adminRegister);
    this.router.post(`${this.path}/verify-admin`, this.verifyAdmin);
    this.router.post(`${this.path}/login-admin`, this.adminLogin);
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const validation = createUserSchema.validate(req.body);
    if (validation.error) {
      const path = validation.error.details[0].path;

      const error = new HttpExceptions(
        false,
        400,
        `Ensure that you have entered the ${path} field correctly please `
      );
      return next(error);
    }

    const userData: ICreateUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender as "Male" | "Female" | "NONE",
      phone: req.body.phone,
    };
    let email: string = req.body.email;
    const credData: ICredential = {
      email: email.toLowerCase(),
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      user_role: req.body.role || "MEMBER",
      is_google: false,
      is_verified: false,
    };

    if (!userData.phone || userData.phone.length < 11) {
      const error = new HttpExceptions(false, 400, "Phone number is required");
      return next(error);
    }

    if (!/^[0-9]+$/.test(userData.phone)) {
      const error = new HttpExceptions(
        false,
        400,
        "Invalid phone number format"
      );
      return next(error);
    }

    createUserSchema.validate(userData);
    try {
      logInfo("submitting data for reg.");
      const response = await this.authService.register(userData, credData);
      logInfo("success now returning response as json:");

      // const novu_user_data = {
      //   email: email,
      //   firstName: req.body.first_name,
      //   lastName: req.body.last_name,
      //   phone: req.body.phone,
      // };
      // await this.novuService.createSubscriber(response["id"], novu_user_data);
      // await this.novuHelper.triggerNewSkyddUserNotification(response["id"]);

      res.status(201).json(AuthResponseMsg.successResponse(response["id"]));
    } catch (error) {
      logError(error);
      next(error);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const { user, message } = await this.authService.login(email, password);

      res
        .status(200)
        .json(AuthResponseMsg.loginAuthSuccessResponse(message, user));
    } catch (error) {
      next(error);
    }
  };

  private googleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { google_token } = req.body;
    // console.log("google_token from ctrller");
    // console.log(google_token);

    try {
      const decodedPayload = await getGoogleUserInfo(google_token);

      if (!decodedPayload) {
        res
          .status(500)
          .json(
            AuthResponseMsg.failureResponse("Failed Google Authentication.")
          );
      }

      console.log(decodedPayload);

      const userData: ICreateUser = {
        first_name: decodedPayload.given_name,
        last_name: decodedPayload.family_name,
        gender: "NONE",
      };

      const email: string = decodedPayload.email;
      const credData: ICredential = {
        email: email.toLowerCase(),
        user_role: UserRoles.MEMBER,
        is_google: true,
        is_verified: true,
      };

      createUserSchema.validate(userData);

      const { user, message } = await this.authService.loginGoogle(
        userData,
        credData
      );

      return res
        .status(200)
        .json(AuthResponseMsg.loginAuthSuccessResponse(message, user));
    } catch (error) {
      logInfo("Google Authentication error: " + error);

      res
        .status(500)
        .json(AuthResponseMsg.failureResponse("Failed Google Authentication."));
    }
  };

  private verify = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    try {
      const { user, message, success } = await this.authService.verify(
        `${token}`,
      );

      res
        .status(200)
        .json(AuthResponseMsg.loginAuthSuccessResponse(message, user));
    } catch (error) {
      next(error);
    }
  };

  private requestPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    try {
      const { message } = await this.authService.requestPasswordReset(
        email as string
      );

      res
        .status(200)
        .json(AuthResponseMsg.requestResetPasswordSuccessResponse(message));
    } catch (error) {
      next(error);
    }
  };

  private submitPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: SubmitResetPassword = req.body;
    try {
      const { message } = await this.authService.submitPasswordReset(data);

      res
        .status(200)
        .json(AuthResponseMsg.submitResetPasswordSuccessResponse(message));
    } catch (error) {
      next(error);
    }
  };

  private resendVerificationToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const response = await this.authService.resendVerificatonToken(email);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: `User ${email} has been sent a verification link.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: `unable to verify user with email ${email}.`,
    });
  };


  private adminRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validation = createAdminSchema.validate(req.body);
      //console.log(validation);
      if (validation.error) {
        const path = validation.error.details[0].path;

        const error = new HttpExceptions(
          false,
          400,
          `Ensure that you have entered the ${path} field correctly please ex: ${validation.error.message}`
        );
        return next(error);
      }

      const response = await this.authService.adminRegister({ ...req.body });
      if (!response.success) {
        return res
          .status(417)
          .json({ success: false, message: response.message });
      }
      return res.status(200).json(response);
    } catch (error) {
      // Sentry.captureException(error);
      next(error);
    }
  };

  private verifyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token, id } = req.body;
    const tokenId = Number(token);

    //console.log(tokenId);
    //console.log(id);
    try {
      const response = await this.authService.verifyAdmin(tokenId, id);
      if (!response.success) {
        return res
          .status(417)
          .json({ success: false, message: response.message });
      }

      return res.status(200).json(response);
    } catch (error) {
      // Sentry.captureException(error);
      next(error);
    }
  };

  private adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(404).json({
          success: false,
          message:
            "Ensure that you have entered the email and password fields.",
        });
      }

      const data = req.body;
      const response = await this.authService.adminLogin(data);
      if (!response.success && !response.queued) {
        return res.status(417).json({
          success: response.success,
          queued: response.queued,
          message: "Unable to login user. Kindly try again.",
        });
      }
      if (response.success && response.queued) {
        return res.status(200).json({
          success: response.success,
          queued: response.queued,
          message: "Unable to login user. Kindly try again.",
        });
      }

      return res.status(200).json({
        success: response.success,
        queued: response.queued,
        message: response.message,
        user: response.user,
      });
    } catch (error) {
      // Sentry.captureException(error);
      next(error);
    }
  };

  private resendAdminVerificationToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const response = await this.authService.resendAdminVerificatonToken(email);
    if (response.success && !response.queued) {
      return res.status(200).json({
        success: true,
        queued: false,
        message: `User ${email} has been sent a verification link.`,
        // user: response.user,

      });
    }
    if (response.success && response.queued) {
      return res.status(200).json({
        success: true,
        queued: true,
        message: `User ${email} has been sent a verification link. Email will be received shortly`,
        // user: response.user,

      });
    }

    return res.status(417).json({
      success: false,
      message: `unable to verify user with email ${email}.`,
    });
  };
}
