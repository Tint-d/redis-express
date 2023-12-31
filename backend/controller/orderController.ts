import { NextFunction, Request, Response } from "express";
import { deleteCart, fetchCartAndItems } from "../services/cartService";
import { BadRequest, NotFound } from "../utils/appErrors";
import { fetchProfileAddress } from "../services/profileService";
import {
  createOrder,
  deleteOrderById,
  fetchOrderById,
  fetchOrderByUsrId,
} from "../services/orderService";

export const setOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const cart = await fetchCartAndItems(userId);
    if (!cart || cart.total === 0 || cart.items.length === 0)
      throw new BadRequest("Cart does not exists");

    const profileData = await fetchProfileAddress(userId);
    const address = profileData?.address as string;
    if (!address) throw new BadRequest("Profilel does not exist");
    const order = await createOrder(userId, address, cart.total, cart.items);
    console.log(order);

    await deleteCart(userId);

    res.status(201).json({
      success: true,
      message: `Order has been placed successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId: string = req.params.orderId;
    const order = await fetchOrderById(orderId);
    res.status(200).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    try {
      const { userId } = req.body.user as { userId: string };
      const order = await fetchOrderByUsrId(userId);
      res.status(200).json({
        success: true,
        message: order,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const removeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId: string = req.params.orderId;
    const order = await fetchOrderById(orderId);

    if (!order) throw new NotFound("Order not found!");
    if (order.paymentDetail)
      throw new BadRequest("Deletion can not be done for paid order");

    const deleteOrder = await deleteOrderById(orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    next(error);
  }
};
