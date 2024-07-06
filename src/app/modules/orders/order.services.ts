import { startSession } from "mongoose";
import AppError from "../../utils/AppError";
import { TOrders } from "./order.types";
import { TProduct } from "../products/product.types";
import Product from "../products/product.model";
import Order from "./order.model";

const createOrderIntoDB = async (payload: TOrders) => {
  const session = await startSession();

  try {
    await session.startTransaction();

    const createdResult = await Order.create([payload], { session });

    if (!createdResult) {
      throw new AppError(500, "Order creation failed in Transaction");
    }

    const product: TProduct = (await Product.findById(
      payload.productId
    )) as TProduct;

    if (product.inventory.quantity >= payload.quantity) {
      const update =
        product.inventory.quantity > 1
          ? { $inc: { "inventory.quantity": -payload.quantity } }
          : { $set: { "inventory.quantity": 0, "inventory.inStock": false } };

      await Product.findByIdAndUpdate(payload.productId, update, {
        new: true,
        session,
      });
    } else {
      return null;
    }

    await session.commitTransaction();
    return createdResult;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message);
  } finally {
    await session.endSession();
  }
};

const getAllOrdersFromDB = async (email: string) => {
  if (email) {
    const isOrderExists: TOrders[] | null = await Order.isExists(email);

    if (!isOrderExists) {
      return isOrderExists;
    }
    const result = await Order.find({ email });

    return result;
  }
  const result = await Order.find();

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
