import { NextFunction, Request, Response } from 'express';
import { random } from 'faker';
import { GameRepository } from '../../../../domain/repositories/GameRepository';
import { createGameRepositoryMock } from '../../../../domain/repositories/__tests__/utils/mocks';
import { StartGameUseCase } from '../../../../domain/usecases/StartGameUseCase';
import { buildStartGameRoute } from '../buildStartGameRoute';

jest.mock('../../../../domain/usecases/StartGameUseCase');

describe('buildStartGameRoute', () => {
  let params: { gameId: string },
    expressRequest: Request,
    expressResponse: Response,
    gameRepository: GameRepository,
    expressNext: NextFunction,
    startGameUseCase: StartGameUseCase;

  beforeEach(() => {
    params = { gameId: random.word() };
    expressRequest = ({ params } as unknown) as Request;
    expressResponse = ({
      json: jest.fn(),
    } as unknown) as Response;
    expressNext = jest.fn();
    gameRepository = createGameRepositoryMock();
    startGameUseCase = ({
      execute: jest.fn(),
    } as unknown) as StartGameUseCase;
    (StartGameUseCase as jest.Mock).mockReturnValue(startGameUseCase);
  });

  afterEach(() => {
    (StartGameUseCase as jest.Mock).mockClear();
  });

  it('should call next with error, which startGameUseCase.execute throws', async () => {
    expect.assertions(2);

    const executionError = new Error(random.words());

    (startGameUseCase.execute as jest.Mock).mockImplementationOnce(() => {
      throw executionError;
    });

    const startGameRoute = buildStartGameRoute({
      gameRepository,
    });

    await startGameRoute(expressRequest, expressResponse, expressNext);

    expect(expressNext).toHaveBeenCalledTimes(1);
    expect(expressNext).toHaveBeenCalledWith(executionError);
  });

  it('should call StartGameUseCase', async () => {
    expect.assertions(6);

    const startGameRoute = buildStartGameRoute({
      gameRepository,
    });

    await startGameRoute(expressRequest, expressResponse, expressNext);

    expect(StartGameUseCase).toHaveBeenCalledTimes(1);
    expect(StartGameUseCase).toHaveBeenCalledWith(gameRepository);

    expect(startGameUseCase.execute).toHaveBeenCalledTimes(1);
    expect(startGameUseCase.execute).toHaveBeenCalledWith({
      gameId: params.gameId,
    });

    expect(expressResponse.json).toHaveBeenCalledTimes(1);
    expect(expressResponse.json).toHaveBeenCalledWith({});
  });
});
