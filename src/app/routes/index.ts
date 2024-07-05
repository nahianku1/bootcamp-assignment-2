import { Router } from "express";
import { productRouter } from "../modules/products/product.routes";
import { orderRouter } from "../modules/orders/order.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: productRouter,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
