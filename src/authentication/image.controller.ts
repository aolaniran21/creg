import express, { Request, Response, NextFunction } from "express";
import ImageUploadHelper from "../helpers/imageupload.helper";

class ImgController {
  public path = "/img";
  public router = express.Router();

  constructor() {
    const imageUploadController = new ImageUploadHelper();
    this.router.post(`${this.path}/upload`, this.uploadImage);
  }

  private uploadImage(req: Request, res: Response, next: NextFunction) {
    console.log(req); // Log the entire request object for inspection
    const imageUploadController = new ImageUploadHelper();
    imageUploadController.uploadImage(req, res, next);
  }
}

export default ImgController;
