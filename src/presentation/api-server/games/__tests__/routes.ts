import { Router } from 'express';
import { createGameConfigValidatorMock } from '../../../../domain/entities/__tests__/utils/mocks';
import {
  createGameRepositoryMock,
  createRoomRepositoryMock,
} from '../../../../domain/repositories/__tests__/utils/mocks';
import { buildCreateGameRoute } from '../buildCreateGameRoute';
import { buildStartGameRoute } from '../buildStartGameRoute';
import { createRouter } from '../routes';

jest.mock('express');
jest.mock('../buildCreateGameRoute');
jest.mock('../buildStartGameRoute');

describe('Api server router', () => {
  let expressRouter: Router;

  beforeEach(() => {
    expressRouter = ({
      post: jest.fn(),
    } as unknown) as Router;

    (Router as jest.Mock).mockReturnValue(expressRouter);
  });

  it('should create router', () => {
    const router = createRouter({
      gameRepository: createGameRepositoryMock(),
      roomRepository: createRoomRepositoryMock(),
      gameConfigValidator: createGameConfigValidatorMock(),
    });

    expect(router).toEqual(expressRouter);
  });

  it('should link create game route', () => {
    const createGameRoute = jest.fn();
    const startGameRoute = jest.fn();

    (buildCreateGameRoute as jest.Mock).mockReturnValue(createGameRoute);
    (buildStartGameRoute as jest.Mock).mockReturnValue(startGameRoute);

    createRouter({
      gameRepository: createGameRepositoryMock(),
      roomRepository: createRoomRepositoryMock(),
      gameConfigValidator: createGameConfigValidatorMock(),
    });

    expect(expressRouter.post).toHaveBeenNthCalledWith(1, '/', createGameRoute);
    expect(expressRouter.post).toHaveBeenNthCalledWith(
      2,
      '/:gameId/start',
      startGameRoute,
    );
  });
});
