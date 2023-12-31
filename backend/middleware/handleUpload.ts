const { multerUpload } = require("../utils/multer");
const { cloudinaryUploader } = require("../utils/cloudinary");
import { ApplicationError, BadRequest } from "../utils/appErrors";
const { unlink } = require("fs").promises;

import { Request, Response, NextFunction } from "express";

export const localUpload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  multerUpload(req, res, function (error: any) {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return next(new BadRequest("File too large"));
      }
      next(error);
    }
    if (!req.file) {
      next(new BadRequest("You must provide a file"));
    }
    next();
  });
};

export const cloudUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const localPath = req.file.path;
    const { image, cloudId } = await cloudinaryUploader(localPath);
    if (!image) {
      await unlink(localPath);
      throw new ApplicationError("Internal server error!");
    }

    req.body.image = image;
    req.body.cloudId = cloudId;
    next();
  } catch (error) {
    next(error);
  }
};
