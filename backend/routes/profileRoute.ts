import { Router } from "express";
import { authorizeAccess } from "../middleware/handleCurrentUser";
import {
  getProfile,
  modifyProfile,
  setProfile,
} from "../controller/profileController";
import { validateProfile, validateProfileUpdate } from "../middleware/validate";

const profileRouter = Router();

profileRouter
  .route("/create")
  .post(authorizeAccess as any, validateProfile as any, setProfile as any);
profileRouter.route("/").get(authorizeAccess as any, getProfile as any);
profileRouter
  .route("/update")
  .put(
    authorizeAccess as any,
    validateProfileUpdate as any,
    modifyProfile as any
  );

export default profileRouter;
