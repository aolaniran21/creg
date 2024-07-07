import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { MetricsService } from "./metrics.service";

import tokenMiddleware from "../../middleware/token.middleware"

export default class MetricsController {
    private metricsService: MetricsService;
    public path = "/metrics";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
        this.metricsService = new MetricsService();
    }



    private initializeRoutes() {

        this.router.get(`${this.path}/pending-requests`, tokenMiddleware.bind(this), this.pendingRequest);
    }


    public pendingRequest = async (req: Request, res: Response) => {
        try {

            if (req.curUser.role !== "ADMIN") {

                return res.status(401).json({
                    error: true,
                    message: "UNAUTHORIZED",
                    code: "UNAUTHORIZED"
                });

            }
            const requests = await this.metricsService.pendingRequest();
            return res.status(200).json({ success: true, data: requests });
        } catch (error) {
            return res.status(400).json({ success: false, data: error.message });
        }
    };

}

