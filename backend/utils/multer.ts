import multer from "multer";
import { BadRequest } from "./appErrors";
import { Request } from "express";
export const fileMaxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  // destination: (req: Request, file: any, cb: any) => {
  //   cb(null, "public/");
  // },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, file.originalname);
  },
});

export const multerUpload = multer({
  storage: storage,
  // fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
  //   if (
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new BadRequest("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
  // limits: { fileSize: fileMaxSize },
}).single("file");
