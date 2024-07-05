import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  console.log(`create order`);

  const orderData = req.body;
  const result = await OrderServices.createOrderIntoDB(orderData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully!",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getSingleOrderFromDB(
    req.query.email as string
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully for user email!",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
