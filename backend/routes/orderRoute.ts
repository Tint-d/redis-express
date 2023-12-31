import { Router } from "express";
import {
  getOrder,
  getOrders,
  removeOrder,
  setOrder,
} from "../controller/orderController";
import { authorizeAccess } from "../middleware/handleCurrentUser";

const orderRouter = Router();

orderRouter.route("/create").post(authorizeAccess as any, setOrder as any);
orderRouter.route("/:orderId").get(authorizeAccess as any, getOrder as any);
orderRouter.route("/").get(authorizeAccess as any, getOrders as any);
orderRouter
  .route("/delete/:orderId")
  .delete(authorizeAccess as any, removeOrder as any);

export default orderRouter;
