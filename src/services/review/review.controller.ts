import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ReviewService } from "./review.service";
import { CreateReview } from "./review.interface";
import tokenMiddleware from "../../middleware/token.middleware"
import { Type } from "./review.enum";

export default class ReviewController {
  private reviewService: ReviewService;
  public path = "/review";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
    this.reviewService = new ReviewService();
  }

  private validateReviewData(data: any) {
    const schema = Joi.object({
      TypeID: Joi.string().guid({ version: "uuidv4" }).required(),

      Type: Joi.string().required(),
      Description: Joi.string().required(),
      Approval: Joi.string().required(),

    });
    return schema.validate(data);
  }

  private validateUpdateReviewData(data: any) {
    const schema = Joi.object({
      ID: Joi.string().guid({ version: "uuidv4" }).required(),
      TypeID: Joi.string().guid({ version: "uuidv4" }).required(),
      Type: Joi.string(),
      Description: Joi.string(),
      Approval: Joi.string(),
    });
    return schema.validate(data);
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, tokenMiddleware.bind(this), this.createReview);
    this.router.post(`${this.path}/update`, tokenMiddleware.bind(this), this.updateReview);
    this.router.get(`${this.path}/pending`, tokenMiddleware.bind(this), this.pendingReview);
    this.router.get(`${this.path}/list/all`, tokenMiddleware.bind(this), this.listReviews);
    this.router.get(`${this.path}/list/:id`, tokenMiddleware.bind(this), this.listReview);
    this.router.get(`${this.path}/user/list`, tokenMiddleware.bind(this), this.userListReview);
  }

  public createReview = async (req: Request, res: Response) => {
    const validation = this.validateReviewData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, data: validation.error.details[0].message });
    if (req.curUser.role !== "ADMIN") {

      return res.status(401).json({
        error: true,
        message: "UNAUTHORIZED",
        code: "UNAUTHORIZED"
      });

    }
    try {
      const reviewData: CreateReview = {
        TypeID: validation.value.TypeID,
        Type: validation.value.Type,
        Description: validation.value.Description,
        Approval: validation.value.Approval,

      };
      const newOrganization = await this.reviewService.createReview(
        reviewData
      );
      return res.status(201).json({ success: true, data: newOrganization });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };

  public updateReview = async (req: Request, res: Response) => {
    const validation = this.validateUpdateReviewData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, data: validation.error.details[0].message });

    // console.log(req.curUser)
    if (req.curUser.role !== "ADMIN") {

      return res.status(401).json({
        error: true,
        message: "UNAUTHORIZED",
        code: "UNAUTHORIZED"
      });

    }
    try {
      const reviewId = validation.value.ID;
      const updateData = {
        ...validation.value,
      };
      const updatedOrganization =
        await this.reviewService.updateReview(
          reviewId,
          updateData
        );
      return res.status(200).json({ success: true, data: updatedOrganization });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };

  public listReview = async (req: Request, res: Response) => {
    try {
      const typeId: string = req.query.type_id as string;
      const type: string = req.query.type as string;
      const revivewId: string = req.params.id as string;

      const Review = await this.reviewService.listReview(
        typeId,
        type,
        revivewId
      );
      return res.status(200).json({ success: true, data: Review });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };
  public userListReview = async (req: Request, res: Response) => {
    try {
      const userId: string = req.query.userId as string;


      const User = await this.reviewService.userListReview(
        userId
      );
      return res.status(200).json({ success: true, data: User });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };
  public listReviews = async (req: Request, res: Response) => {
    try {
      const typeId: string = req.query.type_id as string;
      const type: string = req.query.type as string;

      const Review = await this.reviewService.listReviews(
        typeId,
        type
      );
      return res.status(200).json({ success: true, data: Review });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };


  public pendingReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type_id, type, page, pageSize } = req.query;

      // Convert query parameters to numbers if they exist
      const typeIdNumber: string = type_id as string;
      const Type: string = type as string;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const reviews = await this.reviewService.pendingReview(
        typeIdNumber,
        Type,
        pageNumber,
        pageSizeNumber
      );
      return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      next(error);

      return res.status(400).json({ success: false, message: error.message });
    }
  };
}

