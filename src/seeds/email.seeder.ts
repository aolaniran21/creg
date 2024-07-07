import Email from "../entity/email/email.entity";

const emailData = [
  {
    slug: "reset-password",
    subject: "Reset your password",
    tag: "last_name,first_name,reset_token,token_expiration,link",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Reset Password</title>\
              </head>\
              <body style="font-family: Arial, sans-serif;">\
                <h1>Reset Your Password</h1>\
                <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                <p>You have requested to reset your password. Please click the link below to reset it.</p>\
                <p>\
                  <a href="{{{link}}}/{{{reset_token}}}">Reset Password</a>\
                </p>\
                <p>\
                  This link will expire on: <strong>{{{token_expiration}}}</strong>.\
                </p>\
                <p>Thanks,<br/>Admin</p>\
              </body>\
              </html>',
  },
  {
    slug: "register-success",
    subject: "Registration Successful",
    tag: "last_name,first_name",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>LASEPA Registration Successful</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Registration Successful</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Thanks for registering on our platform.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "admin-register-success",
    subject: "Registration Successful",
    tag: "last_name,first_name,role",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Registration Successful</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Registration Successful</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>You have successfully registered as an <strong>{{{role}}}</strong>.</p>\
                  <p>Thanks,<br/>Your team</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "confirm-password",
    subject: "Confirm Your Account",
    tag: "last_name,first_name,confirm_token,token_expiration,link",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Confirm Your Account</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Confirm Your Account</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Please click the link below to confirm your account.</p>\
                  <p><a href="{{{link}}}/{{{confirm_token}}}">Confirm Account</a></p>\
                  <p>\
                  This link will expire on: <strong>{{{token_expiration}}}</strong>.\
                </p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "account-verification",
    subject: "Account Verification",
    tag: "last_name,first_name,verification_token,token_expiration,link",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Account Verification</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Welcome! Please click the link below to verify your account. The token will expire in {{{token_expiration}}}.</p>\
                  <p><a href="{{{link}}}">Verify Account</a></p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "account-verification-admin",
    subject: "Account Verification",
    tag: "email,token_expiration,otp",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
              <div class="container">\
                  <h1>Account Verification</h1>\
                  <p>Hi <strong>{{{email}}}</strong>,</p>\
                  <p>Welcome! Kindly copy the 6-digit OTP code below to verify your account. The token will expire in {{{token_expiration}}}.</p>\
                  <p><strong>OTP Code:</strong> {{{otp}}}</p>\
                  <p>Thanks,<br/>Admin</p>\
              </div>\
              </body>\
              </html>',
  },
  {
    slug: "resend-verification",
    subject: "Account Verification",
    tag: "last_name,first_name,verification_token,token_expiration,link",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Account Verification</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Welcome! Please click the link below to verify your account.</p>\
                  <p><a href="{{{link}}}">Verify Account</a> The token will expire in {{{token_expiration}}}.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "insurance-activated",
    subject: "Insurance Activated",
    tag: "last_name,first_name,email,policy_type,plan_type,payment_plan",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Insurance Activated</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Congratulations!!! We are glad to inform you that your {{{policy_type}}} insurance policy has been successfully activated.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "incomplete-activation",
    subject: "Incomplete Activation",
    tag: "last_name,first_name,email,skydd_memberId,policy_type,plan_type,payment_plan",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Incomplete Activation</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>Notice!!! We want to inform you that your {{{policy_type}}} insurance policy application is incomplete. Kindly ensure to complete the necessary process.</p>\
                  <p>Your memberId for the <strong>{{{plan_type}}}</strong>, <strong>{{{payment_plan}}}</strong> subscription is <strong>{{{skydd_memberId}}}</strong>.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "payment-success",
    subject: "Successful Payment Transaction",
    tag: "last_name,first_name,amount,txn_id",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Payment Transaction</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>This is to inform you that your payment of {{{amount}}} Naira for insurance policy has been receive and is currently eing processed.</p>\
                  <p>Transaction Id: {{{txn_id}}}.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "payment-pending",
    subject: "Pending Payment Transaction",
    tag: "last_name,first_name,amount",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Payment Pending</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>This is to inform you that your payment of {{{amount}}} Naira for insurance policy is still pending and being processed.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
  {
    slug: "deactivate-enrollment",
    subject: "Subscription Deactivation",
    tag: "last_name,first_name,policy_type",
    html: '<!DOCTYPE html>\
              <html lang="en">\
              <head>\
                <meta charset="UTF-8">\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <title>Account Verification</title>\
                <style>\
                  body {\
                    font-family: Arial, sans-serif;\
                    background-color: #f4f4f4;\
                    color: #333;\
                    margin: 0;\
                    padding: 0;\
                  }\
                  .container {\
                    max-width: 600px;\
                    margin: 20px auto;\
                    background-color: #fff;\
                    padding: 20px;\
                    border-radius: 5px;\
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\
                  }\
                  h1 {\
                    color: #3498db;\
                  }\
                  p {\
                    margin: 15px 0;\
                  }\
                  a {\
                    color: #3498db;\
                    text-decoration: none;\
                    font-weight: bold;\
                  }\
                </style>\
              </head>\
              <body>\
                <div class="container">\
                  <h1>Subscription Deactivated</h1>\
                  <p>Hi <strong>{{{first_name}}} {{{last_name}}}</strong>,</p>\
                  <p>This is to inform you that your {{{policy_type}}} insurance policy has been successfully deactivated.</p>\
                  <p>Thanks,<br/>Admin</p>\
                </div>\
              </body>\
              </html>',
  },
];

async function seedEmails() {
  try {
    // Truncate the emails table
    await Email.destroy({
      truncate: true,
      cascade: true,
    });

    // Bulk insert new data
    await Email.bulkCreate(emailData);

    console.log("Email seeding completed.");
  } catch (error) {
    console.error("Error seeding Email:", error);
  }
}

export default seedEmails;
