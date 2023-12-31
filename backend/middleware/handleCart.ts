import { NextFunction, Request, Response } from "express";
import { fetchProductForCart } from "../services/productService";
import { NotFound } from "../utils/appErrors";
import { createEmptyCart, fetchCartAndItems } from "../services/cartService";

export const checkCurrentUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body.user as { userId: string };
    let cart = await fetchCartAndItems(userId);
    console.log(cart, "cart in checkCurrentUserCart");

    if (!cart) {
      cart = createEmptyCart();
    }
    req.body.cart = cart;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkProductAvailablity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.params as { productId: string };
    const product = await fetchProductForCart(productId);
    if (!product) {
      throw new NotFound("Product not available");
    }
    req.body.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkCartItemAvailablity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params as { productId: string };
    console.log(productId);

    const product = await fetchProductForCart(productId);
    if (!product) {
      throw new NotFound("Product not available");
    }
    req.body.product = product;
    next();
  } catch (error) {
    next(error);
  }
};
