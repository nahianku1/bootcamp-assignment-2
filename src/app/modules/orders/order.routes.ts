import { Router } from "express";
import { OrderControllers} from "./order.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";

export const orderRouter = Router();

orderRouter.post(
  "/",
  [validateRequest(OrderValidation.createOrderSchema)],
  OrderControllers.createOrder
);

orderRouter.get("/", OrderControllers.getAllOrders);
// orderRouter.get("/:productId", OrderControllers.getSingleOrder);
