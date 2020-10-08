import { NextFunction, Request, Response } from 'express';
import { random } from 'faker';
import { GameConfigValidator } from '../../../../domain/entities/GameConfigValidator';
import { createGameConfigValidatorMock } from '../../../../domain/entities/__tests__/utils/mocks';
import { GameRepository } from '../../../../domain/repositories/GameRepository';
import { MapRepository } from '../../../../domain/repositories/MapRepository';
import { RoomRepository } from '../../../../domain/repositories/RoomRepository';
import {
  createGameRepositoryMock,
  createRoomRepositoryMock,
} from '../../../../domain/repositories/__tests__/utils/mocks';
import { CreateGameUseCase } from '../../../../domain/usecases/CreateGameUseCase';
import { buildCreateGameRoute } from '../buildCreateGameRoute';

jest.mock('../../../../domain/usecases/CreateGameUseCase');

describe('buildCreateGameRoute', () => {
  let body: any,
    expressRequest: Request,
    expressResponse: Response,
    gameRepo: GameRepository,
    roomRepo: RoomRepository,
    mapRepo: MapRepository,
    gameConfigValidator: GameConfigValidator,
    next: NextFunction,
    createGameUseCase: CreateGameUseCase;

  beforeEach(() => {
    body = {};
    expressRequest = { body } as Request;
    expressResponse = ({
      json: jest.fn(),
    } as unknown) as Response;
    next = jest.fn();
    gameRepo = createGameRepositoryMock();
    roomRepo = createRoomRepositoryMock();
    gameConfigValidator = createGameConfigValidatorMock();
    createGameUseCase = ({
      execute: jest.fn(),
    } as unknown) as CreateGameUseCase;
    (CreateGameUseCase as jest.Mock).mockReturnValue(createGameUseCase);
  });

  it('should call Crate game use case', async () => {
    expect.assertions(3);

    const createGame = buildCreateGameRoute({
      gameConfigValidator,
      gameRepository: gameRepo,
      roomRepository: roomRepo,
      mapRepository: mapRepo,
    });

    await createGame(expressRequest, expressResponse, next);

    expect(expressResponse.json).toHaveBeenCalled();
    expect(CreateGameUseCase).toHaveBeenCalledWith(
      gameConfigValidator,
      roomRepo,
      gameRepo,
      mapRepo,
    );

    expect(createGameUseCase.execute).toHaveBeenCalledWith(body);
  });

  it('should call next if error was thrown', async () => {
    expect.assertions(2);

    const error = new Error(random.words());

    (createGameUseCase.execute as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    const createGame = buildCreateGameRoute({
      gameConfigValidator,
      gameRepository: gameRepo,
      roomRepository: roomRepo,
      mapRepository: mapRepo,
    });

    await createGame(expressRequest, expressResponse, next);

    expect(expressResponse.json).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledWith(error);
  });
});
