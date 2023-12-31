import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/appErrors";
import { fetchCategory } from "../services/categoryService";

interface CustomRequest extends Request {
  categoryId?: string;
}

export const checkProductCategory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    console.log(product, "in checkProductCategory");

    const category = await fetchCategory(product.category);
    console.log(category);

    if (!category) {
      throw new BadRequest("Invalid category name");
    }
    req.body.categoryId = category.id;
    req.body.category = category.categoryName;

    next();
  } catch (error) {
    next(error);
  }
};
