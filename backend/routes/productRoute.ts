import express from "express";
import {
  addProductStock,
  getProduct,
  getProductsByCategory,
  searchProducts,
  setProduct,
} from "../controller/productController";
import {
  authorizeAccess,
  authorizeAdmin,
} from "../middleware/handleCurrentUser";
import { cloudUpload, localUpload } from "../middleware/handleUpload";
import { validateAddStock, validateProduct } from "../middleware/validate";
import { pagination } from "../middleware/pagination";
import { checkProductCategory } from "../middleware/checkPrductCategory";

const productRouter = express.Router();

productRouter
  .route("/create")
  .post(
    authorizeAccess as any,
    authorizeAdmin as any,
    localUpload as any,
    validateProduct as any,
    cloudUpload as any,
    checkProductCategory as any,
    setProduct as any
  );
productRouter.route("/").get(pagination as any, getProductsByCategory as any);
productRouter.route("/all/search").get(searchProducts as any);
productRouter.route("/:productId").get(getProduct as any);
productRouter
  .route("/addStock/:productId")
  .put(
    authorizeAccess as any,
    authorizeAdmin as any,
    validateAddStock as any,
    addProductStock as any
  );

export default productRouter;
