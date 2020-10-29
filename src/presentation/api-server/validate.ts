import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from './errors/ValidationError';

export default function validate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req).formatWith((error) => error.msg);

  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.mapped()));
  }

  return next();
}
