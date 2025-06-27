import express from "express";
import {
  getProductsByCategoryIdController,
  getProductByIdController,
  getAllProductsController,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.get("/category/:categoryId", getProductsByCategoryIdController);
productRouter.get("/Id/:_id", getProductByIdController);
productRouter.get("/", getAllProductsController);

export default productRouter;
