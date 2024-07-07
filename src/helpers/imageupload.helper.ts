import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import Datauri from "datauri/parser";

class ImageUploadHelper {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Multer configuration
  private multerStorage = multer.memoryStorage(); // Use memory storage for buffers
  private multerUpload = multer({ storage: this.multerStorage }).single("file"); // Accept single file with field name 'file'

  public uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      // Use multer to handle file upload
      this.multerUpload(req, res, async (err) => {
        if (err) {
          console.error("Error uploading image:", err);
          return res.status(500).json({ error: "Image upload failed" });
        }

        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        // Convert the buffer to URL
        const dataUrl = this.dataUri(req).content;

        // Upload the image to Cloudinary
        cloudinary.uploader
          .upload(dataUrl, {
            folder: "uploads",
          })
          .then((result) => {
            res.json({ imageUrl: result.secure_url });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            res.status(500).json({ error: "Image upload failed" });
          });
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Image upload failed" });
    }
  }

  private dataUri(req: Request) {
    const ext = req.file.originalname.split(".").pop();
    const dataUri = new Datauri();
    return dataUri.format(`.${ext}`, req.file.buffer);
  }
}

export default ImageUploadHelper;
