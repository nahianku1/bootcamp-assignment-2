import { Model } from "mongoose";

export type TVariants = {
  type: string;
  value: string;
  _id?: string;
};
export type TInventory = {
  quantity: number;
  inStock: boolean;
  _id?: string;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
};

export interface ProductModel extends Model<TProduct> {
  isExists(id: string): Promise<TProduct | null>;
}
