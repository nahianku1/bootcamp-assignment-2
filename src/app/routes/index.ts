import { Router } from "express";
import { productRouter } from "../modules/products/product.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
