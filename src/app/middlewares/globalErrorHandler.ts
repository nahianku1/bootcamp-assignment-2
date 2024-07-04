/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  handleCastError,
  handleDuplicateError,
  handleMongoValidationError,
  handleZodError,
} from "../errors/errorHandlers";
import httpStatus from "http-status";
import AppError from "../utils/AppError";
import config from "../config";
import { TErrorSource } from "../errors/error.types";

export function globalErrorhandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode: number = 500;
  let message: string = "Something went wrong!";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: `Something went wrong!`,
    },
  ];

  if (err instanceof ZodError) {
    const error = handleZodError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err?.name === "ValidationError") {
    const error = handleMongoValidationError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err?.name === "CastError") {
    const error = handleCastError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err?.name === "MongoServerError" && err?.code === 11000) {
    const error = handleDuplicateError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err?.stack.includes("E11000")) {
    const error = handleDuplicateError(err);
    statusCode = error.statusCode;
    message = error.message;
    errorSources = error.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    err,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
}
