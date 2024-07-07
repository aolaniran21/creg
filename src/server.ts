import "dotenv/config";
import AuthController from "./authentication/authentication.controller";
import App from "./app";
import OrganizationController from "./services/organization/organization.controller";
import ProjectController from "./services/project/project.controller";
import ImgController from "./authentication/image.controller";
import UserController from "./services/user/user.controller";
import ReviewController from "./services/review/review.controller";
import MetricsController from "./services/metrics/metrics.controller";
// import PaystackController from "./services/paystack/paystack.controller";
// import ApiController from "./api/ApiController";
// import HmoController from "./services/hmo/hmo.controller";

(async () => {
  const app = new App([
    new UserController(),
    new ReviewController(),
    new AuthController(),
    new OrganizationController(),
    new ImgController(),
    new ProjectController(),
    new MetricsController(),
    // new PaystackController(),
    // new ApiController(),
  ]);

  app.listen();
})();
