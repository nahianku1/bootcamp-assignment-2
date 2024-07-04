import AppError from "../../utils/AppError";
import Product from "./product.model";
import { TProduct } from "./product.types";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create([payload]);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const isProductExists = await Product.isExists(id);

  if (!isProductExists) {
    throw new AppError(404, "Product not found!");
  }

  const result = await Product.findById(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
