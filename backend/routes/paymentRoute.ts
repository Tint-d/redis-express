import { Router } from "express";
import { authorizeAccess } from "../middleware/handleCurrentUser";
import { setPayment } from "../controller/paymentController";
import { checkOrder } from "../middleware/checkOrder";

const paymentRouter = Router();

paymentRouter
  .route("/:orderId")
  .post(authorizeAccess as any, checkOrder as any, setPayment as any);

export default paymentRouter;
