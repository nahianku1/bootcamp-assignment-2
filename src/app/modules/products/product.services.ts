import Product from "./product.model";
import { TProduct } from "./product.types";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create([payload]);
  return result;
};

export const ProductServices = { createProductIntoDB };
