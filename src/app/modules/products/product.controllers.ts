import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
};
