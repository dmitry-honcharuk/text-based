import { Request, Response } from 'express';
import { random } from 'faker';

import { errorHandler } from '../errorHandler';
import { DomainError } from '../../../domain/Errors/DomainError';

describe('errorHandler', () => {
  let expressRequest: Request, expressResponse: Response;

  beforeEach(() => {
    expressRequest = {} as Request;
    expressResponse = ({
      status: jest.fn(),
      json: jest.fn(),
    } as unknown) as Response;

    (expressResponse.status as jest.Mock).mockReturnValueOnce(expressResponse);
  });

  it('should respond on domain error', () => {
    errorHandler(
      new DomainError(random.words()),
      expressRequest as Request,
      (expressResponse as unknown) as Response,
      jest.fn(),
    );

    expect(expressResponse.status).toHaveBeenCalledWith(400);
  });

  it('should respond on generic error', () => {
    errorHandler(
      new Error(random.words()),
      expressRequest as Request,
      (expressResponse as unknown) as Response,
      jest.fn(),
    );

    expect(expressResponse.status).toHaveBeenCalledWith(500);
  });
});
