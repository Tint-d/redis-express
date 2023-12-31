import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/appErrors";
import {
  userEmailValidation,
  userSignUpValidation,
  userValidation,
} from "../validations/userValidation";
import {
  productValidation,
  stockValidation,
} from "../validations/productValidation";
import { categoryValidation } from "../validations/categoryValidation";
import {
  profileUpdationValidation,
  profileValidation,
} from "../validations/profileValidation";
import Joi from "joi";

export const validateUserSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { name, email, password } = req.body;

    const { error } = userSignUpValidation({
      name: name,
      email: email,
      password: password,
    });

    if (error) {
      const messages: string[] = error.details.map((error) => error.message);
      throw new BadRequest(messages.join("\n"));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation({ email: email, password: password });
    if (error) {
      throw new BadRequest("Invalid email or password!");
    } else {
      next();
    }
  } catch (error) {
    next();
    // console.log(error);
  }
};

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    const { name, price, stock, desc } = req.body;
    const { error } = productValidation({
      name: name,
      price: price,
      stock: stock,
      desc: desc,
    });

    if (error) {
      const messages: string[] = error.details.map((error) => error.message);
      throw new BadRequest(messages.join("\n"));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const validateAddStock = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { stock } = req.body as { stock: number };

    const { error } = stockValidation({ stock });

    if (error) {
      throw new BadRequest(error.message);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const validateUserEmail = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { email } = req.body;
    const { error } = userEmailValidation({
      email: email,
    });

    if (error) {
      throw new BadRequest("Invalid Email");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const validateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { phone, address } = req.body as { phone: string; address: string };
    const { error } = profileValidation({
      phone: phone,
      address: address,
    });
    if (error) {
      const messages: string[] = error.details.map(
        (error: Joi.ValidationErrorItem) => error.message
      );
      throw new BadRequest(messages.join("\n"));
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

export const validateProfileUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { phone, address } = req.body as { phone: string; address: string };
    if (!phone && !address) {
      throw new BadRequest("Atleast 1 field required!");
    }
    const { error } = profileUpdationValidation({
      phone: phone,
      address: address,
    });
    if (error) {
      const messages: string[] = error.details.map(
        (error: Joi.ValidationErrorItem) => error.message
      );
      throw new BadRequest(messages.join("\n"));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
