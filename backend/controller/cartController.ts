import { NextFunction, Request, Response } from "express";
import {
  createCartItemToCart,
  decrementCartItemQuantity,
  deleteCart,
  deleteCartItem,
  fetchCartAndItems,
  incrementCartItemQuantity,
} from "../services/cartService";
import { NotFound } from "../utils/appErrors";

export interface CartType {
  productId: string;
  price: number;
  subTotal: number;
  quantity: number;
}

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body.user as { userId: string };
    const cart = await fetchCartAndItems(userId);

    res.status(200).json({
      success: true,
      message: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const setCartItemInc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body.user as { userId: string };

    const { price } = req.body.product as { price: number };

    const currentCart = req.body.cart as CartType;

    const availablity = req.body.availablity as boolean;

    const { productId } = req.params as { productId: string };

    if (!availablity) {
      await createCartItemToCart(userId, productId, price, currentCart);

      return res.status(201).json({
        success: true,
        message: "New Item added to cart",
      });
    }

    // const itemIndex = req.body.productIndex as number;
    // await incrementCartItemQuantity(userId, currentCart, itemIndex);
    // res.status(201).json({
    //   success: true,
    //   message: "Item added to cart",
    // });
  } catch (error) {
    next(error);
  }
};

export const removeCartItemDec = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const currentCart = req.body.cart as CartType;
    const availablity = req.body.availablity as boolean;

    if (!availablity) {
      throw new NotFound("Item not exist in the cart");
    }
    const itemIndex = req.body.productIndex as number;

    await decrementCartItemQuantity(userId, currentCart, itemIndex);
    res.status(200).json({
      success: true,
      message: "Item decremented",
    });
  } catch (error) {
    next(error);
  }
};

export const incrementItemInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const currentCart = req.body.cart as CartType;
    const availablity = req.body.availablity as boolean;
    const itemIndex = req.body.productIndex as number;
    await incrementCartItemQuantity(userId, currentCart, itemIndex);
    res.status(201).json({
      success: true,
      message: "Item increment!",
    });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const currentCart = req.body.cart as CartType;
    const availablity = req.body.availablity as boolean;
    if (!availablity) {
      throw new NotFound("Item not found");
    }
    const itemIndex = req.body.productIndex as number;
    await deleteCartItem(userId, currentCart, itemIndex);
    res.status(200).json({
      success: true,
      message: "Cart Item deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const removeAllItemInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    await deleteCart(userId);
    res.status(200).json({
      success: true,
      message: "Cart Deleted",
    });
  } catch (error) {
    next(error);
  }
};
