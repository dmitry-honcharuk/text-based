import { NextFunction, Request, Response } from 'express';

import { DomainError } from '../../domain/Errors/DomainError';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const status = error instanceof DomainError ? 400 : 500;

  return res.status(status).json({
    message: error.message,
  });
}
