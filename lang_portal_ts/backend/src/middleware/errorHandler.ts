import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Database validation error',
      details: err.message
    });
  }

  console.error(err);
  res.status(500).json({
    error: 'Internal server error'
  });

  // Ensure next is called to avoid "Not all code paths return a value" error
  next();
  
  // Add a return statement to satisfy TypeScript
  return;
}; 