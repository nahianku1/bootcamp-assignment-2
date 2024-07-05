import { Schema } from "mongoose";
import { model } from "mongoose";
import { OrderModel, TOrders } from "./order.types";

const OrderSchema = new Schema<TOrders, OrderModel>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        const { _id, ...remainingData } = ret;
        return { ...remainingData };
      },
    },
  }
);

OrderSchema.statics.isExists = async (email) => {
  const result = await Order.find({ email });
  //if result contains empty array then return null
  if (result.length === 0) {   
    return null;
  }
  return result;
};

const Order = model<TOrders, OrderModel>("Order", OrderSchema);

export default Order;
