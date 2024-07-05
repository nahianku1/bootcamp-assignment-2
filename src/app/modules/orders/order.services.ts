import { startSession } from "mongoose";
import AppError from "../../utils/AppError";
import { TOrders } from "./order.types";
import { TProduct } from "../products/product.types";
import Product from "../products/product.model";
import Order from "./order.model";

const createOrderIntoDB = async (payload: TOrders) => {
  const session = await startSession();
  let result;

  try {
    await session.startTransaction();

    const createdResult = await Order.create([payload], { session });

    if (!createdResult) {
      throw new AppError(500, "Order creation failed in Transaction");
    }

    const product: TProduct = (await Product.findById(
      payload.productId
    )) as TProduct;

    console.log(payload.productId);

    if (product.inventory.quantity > 1) {
      result = await Product.findByIdAndUpdate(
        payload.productId,
        { $inc: { "inventory.quantity": -1 } },
        { new: true, session }
      );
    } else if (product.inventory.quantity === 1) {
      result = await Product.findByIdAndUpdate(
        payload.productId,
        { $set: { "inventory.quantity": 0, "inventory.inStock": false } },
        { new: true, session }
      );
    }

    if (!result) {
      throw new AppError(500, "Product update failed in Transaction!");
    }

    await session.commitTransaction();
    await session.endSession();
    return createdResult;
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message);
  } finally {
    await session.endSession();
  }
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrderFromDB = async (email: string) => {
  const isOrderExists = await Order.isExists(email);

  if (!isOrderExists) {
    throw new AppError(404, "Order not found!");
  }

  const result = await Order.find({ email });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
};
