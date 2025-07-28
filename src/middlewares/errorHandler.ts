import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  const response = {
    message: err.message || 'Internal Server Error',
    success: false,
    error: {},
  };

  // If Mongoose validation error, include details
  if (err.name === 'ValidationError') {
    response.error = err.errors || err;
  } else {
  
    response.error = err.message ? { message: err.message } : err;
  }

  res.status(statusCode).json(response);
}
