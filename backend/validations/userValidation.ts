import Joi from "joi";

export const userSignUpValidation = (user: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user, { abortEarly: false });
};

export const userValidation = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(user, { abortEarly: false });
};

export const userEmailValidation = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(user, { abortEarly: false });
};
