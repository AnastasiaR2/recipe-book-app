import { AppError } from "../middlewares/errorHandler";

const createAppError = (message: string, status = 500): AppError => {
  const err = new Error(message) as AppError;
  err.status = status;
  return err;
};

export { createAppError };
