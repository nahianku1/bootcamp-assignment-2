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
    data: result ? result[0] : "",
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
    message: searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : "Products fetched successfully!",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductFromDB(
    req.params.productId
  );

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Product not found!",
    });
  }

  if (!res.headersSent) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  }
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateSingleProductIntoDB(
    req.params.productId,
    req.body
  );
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Product not found!",
    });
  }

  if (!res.headersSent) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  }
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProductFromDB(
    req.params.productId
  );
  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Product not found!",
    });
  }

  if (!res.headersSent) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  }
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
