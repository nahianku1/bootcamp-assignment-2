import Product from "./product.model";
import { TProduct } from "./product.types";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create([payload]);
  return result;
};

const getProductsFromDB = async () => {
  console.log(`Getting products from`);

  const result = await Product.find();
  return result;
};

export const ProductServices = { createProductIntoDB, getProductsFromDB };
