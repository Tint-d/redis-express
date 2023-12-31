import { NextFunction, Request, Response } from "express";
import { fetchOrderForPayment } from "../services/orderService";
import { BadRequest, NotFound } from "../utils/appErrors";

export const checkOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId: string = req.params.orderId;
    const order = await fetchOrderForPayment(orderId);
    if (!order) throw new NotFound("Order does nor exist!");
    if (order.paymentDetail)
      throw new BadRequest("Already paid for this order");
    req.body.order = order;
    next();
  } catch (error) {
    next(error);
  }
};
