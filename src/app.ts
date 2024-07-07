import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import IController from "./interfaces/controller.interface";
import dbConnection from "./sequelize.config";
import { sequelize } from "./sequelize.config";
import seedEmails from "./seeds/email.seeder";
// import Organization from "./services/organization/organization.entity";
// import Admin from "./entity/users/user.admin.entity";
// import Project from "./services/project/project.entity";
// import readAndSeedHygeiaAddress from "./seeds/hygeia_address.seeder";
// import readAndSeedAxamansardAddress from "./seeds/axamansard_address.seeder";
// import seedHmoPlan from "./seeds/hmo_plan.seeder";
// import seedSkyddPlan from "./seeds/skydd.plan.seeder";
import { logInfo, logError } from "./logger.service";
// import { runCronJobs } from "./scripts/index.cron";

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.home();
    this.listModels();
    this.syncDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    dbConnection();
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private home() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Welcome to Carbon Registry!!!");
    });
  }

  private listModels = async () => {
    try {
      Object.keys(sequelize.models).forEach((modelName) => {
        logInfo(`Model Name: ${modelName}`);
      });
    } catch (error) {
      logError("Error synchronizing models:" + error);
    }
  };

  private syncDatabase = async () => {
    // await Organization.sync({ force: true });
    // await Project.sync({ force: true });
    // await Admin.sync({ force: true });

    sequelize
      .sync({ alter: true })
      // .sync({ force: true })
      .then(async () => {
        seedEmails();
        // await seedHmoPlan();
        // await seedSkyddPlan();
        // readAndSeedHygeiaAddress();
        // readAndSeedAxamansardAddress();
        logInfo("Database synchronized successfully!");
      })
      .catch((error) => {
        logError("Unable to synchronize database: " + error);
      });
  };

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      logInfo(`
///////////////////////////////////////
Server listening on port ${process.env.PORT}
//////////////////////////////////////
      `);
    });
  }
}

export default App;
