import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../../domain/Errors/DomainError';
import { ValidationError } from './errors/ValidationError';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status =
    error instanceof DomainError || error instanceof ValidationError
      ? 400
      : 500;

  const payload =
    error instanceof ValidationError
      ? error.payload
      : {
          message: error.message,
        };

  return res.status(status).json(payload);
}
