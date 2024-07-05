import AppError from "../../utils/AppError";
import Product from "./product.model";
import { TProduct } from "./product.types";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create([payload]);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: ["name", "description"].map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const isProductExists = await Product.isExists(id);

  if (!isProductExists) {
    return null;
  }

  const result = await Product.findById(id);
  return result;
};

const updateSingleProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>
) => {
  const isProductExists = await Product.isExists(id);

  const { inventory, ...remainingData }: Record<string, unknown> = payload;

  if (!isProductExists) {
    return null;
  }

  if (inventory && Object.keys(inventory).length) {
    for (const [key, value] of Object.entries(inventory)) {
      remainingData[`inventory.${key}`] = value;
    }
  }

  const result = await Product.findByIdAndUpdate(id, remainingData, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const isProductExists = await Product.isExists(id);

  if (!isProductExists) {
    return null;
  }

  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteProductFromDB,
};
