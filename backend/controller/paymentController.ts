import { NextFunction, Request, Response } from "express";
import { ApplicationError, BadRequest } from "../utils/appErrors";
import { makePayment } from "../utils/stripePayment";
import { updateOrderWithPaymentAndTrack } from "../services/orderService";

export const setPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { address, total, paymentDetail } = req.body.order as {
      address: string;
      total: number;
      paymentDetail: any;
    };
    const { number, exp_month, exp_year, cvc, currency } = req.body;
    const { userId } = req.body.user as { userId: string };
    const orderId: string = req.params.orderId;
    if (paymentDetail)
      throw new BadRequest("Payement already done for this order");
    const paymentIntent = await makePayment(
      total,
      number,
      exp_month,
      exp_year,
      cvc,
      currency
    );

    if (paymentIntent.status !== "succeeded")
      throw new ApplicationError("Payment Failed");

    await updateOrderWithPaymentAndTrack(
      userId,
      orderId,
      total,
      currency,
      address
    );

    res.status(201).json({
      success: true,
      message: "Payment Successfull",
    });
  } catch (error) {
    next(error);
  }
};

// {
//     "number": "4242424242424242",
//     "exp_month": 8,
//     "exp_year": 2023,
//     "cvc": "314",
//     "currency": "usd"
// }
