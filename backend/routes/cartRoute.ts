import { Router } from "express";
import {
  getCart,
  incrementItemInCart,
  removeAllItemInCart,
  removeCartItem,
  removeCartItemDec,
  setCartItemInc,
} from "../controller/cartController";
import { authorizeAccess } from "../middleware/handleCurrentUser";
import {
  checkCartItemAvailablity,
  checkCurrentUserCart,
  checkProductAvailablity,
} from "../middleware/handleCart";

const cartRouter = Router();

cartRouter.route("/getAllCart").get(authorizeAccess as any, getCart as any);

cartRouter
  .route("/addtocart/:productId")
  .post(
    authorizeAccess as any,
    checkProductAvailablity as any,
    checkCurrentUserCart as any,
    checkCartItemAvailablity as any,
    setCartItemInc as any
  );

cartRouter
  .route("/dec/:productId")
  .delete(
    authorizeAccess as any,
    checkCurrentUserCart as any,
    checkCartItemAvailablity as any,
    removeCartItemDec as any
  );
cartRouter
  .route("/inc/:productId")
  .post(
    authorizeAccess as any,
    checkCurrentUserCart as any,
    checkCartItemAvailablity as any,
    incrementItemInCart as any
  );

cartRouter
  .route("/remove/:productId")
  .delete(
    authorizeAccess as any,
    checkCurrentUserCart as any,
    checkCartItemAvailablity as any,
    removeCartItem as any
  );

cartRouter
  .route("/removeAllCart")
  .delete(authorizeAccess as any, removeAllItemInCart as any);

export default cartRouter;
