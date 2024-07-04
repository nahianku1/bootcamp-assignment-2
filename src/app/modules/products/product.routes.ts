import { Router } from "express";
import { ProductControllers } from "./product.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

export const productRouter = Router();

productRouter.post(
  "/",
  [validateRequest(ProductValidation.createProductSchema)],
  ProductControllers.createProduct
);

productRouter.get("/", ProductControllers.getAllProducts);
productRouter.get("/:productId", ProductControllers.getSingleProduct);
productRouter.put(
  "/:productId",
  validateRequest(ProductValidation.updateProductSchema),
  ProductControllers.updateSingleProduct
);
