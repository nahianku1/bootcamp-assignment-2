import { z } from "zod";

const VariantsSchema = z.object({
  type: z.string({
    required_error: "Type is required!",
    invalid_type_error: "Invalid Type!",
  }),
  value: z.string({
    required_error: "Value is required!",
    invalid_type_error: "Invalid Value!",
  }),
});

const InventorySchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required!",
    invalid_type_error: "Invalid Quantity!",
  }),
  inStock: z.boolean({
    required_error: "Stock is required!",
    invalid_type_error: "Invalid Stock!",
  }),
});

const createProductSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
    invalid_type_error: "Invalid Name!",
  }),
  description: z.string({
    required_error: "Description is required!",
    invalid_type_error: "Invalid Description!",
  }),
  price: z
    .number({
      required_error: "Price is required!",
      invalid_type_error: "Price is invalid!",
    })
    .positive({ message: "Price should be a positive number!" }),
  category: z.string({
    required_error: "Category is required!",
    invalid_type_error: "Invalid Category!",
  }),
  tags: z.array(
    z.string({
      invalid_type_error: "Tag item should be a string!",
    }),
    {
      required_error: "Tags is required!",
      invalid_type_error: "Invalid Tag!",
    }
  ),
  variants: z.array(VariantsSchema),
  inventory: InventorySchema,
});

export const ProductValidation = { createProductSchema };
