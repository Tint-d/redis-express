import express, { Router } from "express";
import {
  changePassword,
  deleteUser,
  forgetPassword,
  logOut,
  login,
  refresh,
  resendVerificationEmail,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controller/userController";
import {
  validateUser,
  validateUserEmail,
  validateUserSignUp,
} from "../middleware/validate";
// import { authenticate } from "../middleware/authenticate";
import { authorizeRefresh } from "../middleware/handleCurrentUser";
import { authenticate } from "../middleware/authenticate";

const userRouter: Router = express.Router();

userRouter.route("/register").post(validateUserSignUp as any, signUp as any);
userRouter.route("/verify/:token").get(verifyEmail as any);
userRouter.route("/resend").post(resendVerificationEmail as any);
userRouter.route("/login").post(validateUser as any, login as any);
userRouter.route("/refresh").get(authorizeRefresh as any, refresh as any);
userRouter.route("/logout").post(authenticate as any, logOut as any);
userRouter
  .route("/forget")
  .post(validateUserEmail as any, forgetPassword as any);
userRouter.route("/change").post(validateUser as any, changePassword as any);
userRouter.route("/reset/:userId/:token").put(resetPassword as any);
userRouter.route("/delete/:userId").delete(deleteUser as any);

export default userRouter;
