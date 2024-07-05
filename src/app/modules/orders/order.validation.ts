import { z } from "zod";

const createOrderSchema = z.object({
  email: z
    .string({
      required_error: "Name is required!",
      invalid_type_error: "Invalid Name!",
    })
    .email({ message: "Email is not Valid!" }),
  productId: z.string({
    required_error: "Description is required!",
    invalid_type_error: "Invalid Description!",
  }),
  price: z
    .number({
      required_error: "Price is required!",
      invalid_type_error: "Price is invalid!",
    })
    .positive({ message: "Price should be a positive number!" }),
  quantity: z.number({
    required_error: "Quantity is required!",
    invalid_type_error: "Quantity is invalid!",
  }),
});


export const OrderValidation = { createOrderSchema };
