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

const getAllProducts = catchAsync(async (req, res) => {
  const searchTerm = req.query.searchTerm || "";
  const result = await ProductServices.getAllProductsFromDB(
    searchTerm as string
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(
    req.params.productId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateSingleProductIntoDB(
    req.params.productId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(
    req.params.productId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
