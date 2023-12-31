import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  fetchProduct,
  fetchProductSearchResults,
  fetchProductsWithPagination,
  updateProductStock,
} from "../services/productService";
import { NotFound } from "../utils/appErrors";

interface PdReqType {
  name: string;
  price: number;
  stock: number;
  desc: string;
  image: string | null;
  cloudId: string | null;
  categoryId: string;
  category?: string;
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const product = await fetchProduct(productId);
    if (!product) throw new NotFound("Product not found");

    res.status(200).json({
      success: true,
      message: { product: product },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, take, skip } = req.query as {
      category: string;
      take: string;
      skip: string;
    };

    const numberSkip = parseInt(skip, 10);
    const numbertake = parseInt(take, 10);

    const products: PdReqType[] = await fetchProductsWithPagination(
      category,
      numberSkip,
      numbertake
    );

    res.status(200).json({
      success: true,
      message: { products: products, numberOfProduct: products.length },
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { arg } = req.query as { arg: string };
    const products = await fetchProductSearchResults(arg);

    res.status(200).json({
      success: true,
      message: { products: products },
    });
  } catch (error) {
    next(error);
  }
};

export const setProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, stock, desc, image, cloudId, categoryId } =
      req.body as PdReqType;
    const product = await createProduct({
      name: name,
      price: price,
      stock: stock,
      desc: desc,
      image: image,
      cloudId: cloudId,
      categoryId: categoryId,
    });

    res.status(201).json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addProductStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const stock = req.body.stock;
    const updatedProduct = await updateProductStock(productId, stock);

    res.status(200).json({
      success: true,
      message: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
