import { TOrders } from "./order.types";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  console.log(`create order`);

  const orderData = req.body;
  const result: TOrders[] | null = await OrderServices.createOrderIntoDB(
    orderData
  );
  if (!result) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Insufficient quantity available in inventory",
    });
  }
  if (!res.headersSent) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order created successfully!",
      data: result ? result[0] : ""
    });
  }
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(
    (req.query.email || "") as string
  );
  console.log(result);

  if (!result) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Order not found",
    });
  }
  if (!res.headersSent) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  }
});

// const getSingleOrder = catchAsync(async (req, res) => {
//   const result = await OrderServices.getSingleOrderFromDB(
//     req.query.email as string
//   );
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Orders fetched successfully for user email!",
//     data: result,
//   });
// });

export const OrderControllers = {
  createOrder,
  getAllOrders,
  // getSingleOrder,
};
