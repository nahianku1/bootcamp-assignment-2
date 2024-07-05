import { Model } from "mongoose";

export type TOrders = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface OrderModel extends Model<TOrders> {
  isExists(email: string): Promise<TOrders[] | null>;
}
