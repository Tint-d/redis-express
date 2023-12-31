import Joi, { number } from "joi";

export const productValidation = (product: any) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(1).required(),
    desc: Joi.string().min(5).max(300).required(),
  });
  return schema.validate(product, { abortEarly: false });
};

export const stockValidation = (stock: any) => {
  const schema = Joi.object({
    stock: Joi.number().integer().min(1).required(),
  });
  return schema.validate(stock, { abortEarly: false });
};
