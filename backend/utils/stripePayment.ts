import { getStripeKey } from "./appConfig";

const Stripe = require("stripe");
const stripeKey = getStripeKey();
const stripe = Stripe(stripeKey);

export const makePayment = async (
  amount: number,
  number: string,
  exp_month: number,
  exp_year: number,
  cvc: string,
  currency: string
): Promise<any> => {
  const { id } = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: number,
      exp_month: exp_month,
      exp_year: exp_year,
      currency: currency,
      cvc: cvc,
    },
  });

  const paymentIntents = await stripe.paymentIntents.create({
    payment_method: id,
    amount: amount,
    currency: currency,
    confirm: true,
    payment_method_types: ["card"],
  });

  return paymentIntents;
};
