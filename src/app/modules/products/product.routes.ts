import { Router } from "express";
import { ProductControllers } from "./product.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

export const productRouter = Router();

productRouter.post(
  "/create-product",
  [validateRequest(ProductValidation.createProductSchema)],
  ProductControllers.createProduct
);
