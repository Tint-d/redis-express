import Joi from "joi";

interface Profile {
  phone: string;
  address: string;
}

export const profileValidation = (profile: Profile) => {
  const schema = Joi.object({
    phone: Joi.string().min(8).max(255).required(),
    address: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(profile, { abortEarly: false });
};

export const profileUpdationValidation = (profile: Profile) => {
  const schema = Joi.object({
    phone: Joi.string().min(8).max(255),
    address: Joi.string().min(5).max(255),
  });
  return schema.validate(profile, { abortEarly: false });
};
