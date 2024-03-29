import { Request, Response } from "express";
import { HTTP, mainError } from "./mainError";

const preparedError = (err: mainError, res: Response) => {
  res.status(HTTP.BAD_REQUEST).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
    stack: err.stack,
    error: err,
  });
};

export const errorHandler = (err: mainError, req: Request, res: Response) => {
  preparedError(err, res);
};
