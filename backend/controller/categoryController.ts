import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  fetchCategories,
  updateCategoryName,
} from "../services/categoryService";
import { Conflict, NotFound } from "../utils/appErrors";

export const setCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryName } = req.body as { categoryName: string };
    const newCategory = await createCategory(categoryName);
    res.status(201).json({
      success: true,
      message: `Category created by name '${newCategory.categoryName}'`,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await fetchCategories();
    res.status(200).json({
      success: true,
      message: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const modifyCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params as { categoryId: string };
    const { categoryName } = req.body as { categoryName: string };
    await updateCategoryName(categoryId, categoryName);

    res.status(200).json({
      success: "true",
      message: `Category updated for id ${categoryId}`,
    });
  } catch (error) {
    if ((error as any).code === "P2025") {
      next(new NotFound("Category not found"));
    } else if ((error as any).code === "P2002") {
      next(new Conflict("Category already exists with this name"));
    } else {
      next(error);
    }
  }
};
