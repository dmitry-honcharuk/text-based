import { Router } from 'express';
import { createGameConfigValidatorMock } from '../../../../domain/entities/__tests__/utils/mocks';
import {
  createCommandRepositoryMock,
  createGameRepositoryMock,
  createMapRepositoryMock,
  createPlayerRepositoryMock,
  createRoomRepositoryMock,
} from '../../../../domain/repositories/__tests__/utils/mocks';
import { buildCreateGameRoute } from '../buildCreateGameRoute';
import { buildStartGameRoute } from '../buildStartGameRoute';
import {
  createRouter,
  Dependencies as CreateRouterDependencies,
} from '../routes';

jest.mock('express');
jest.mock('../buildCreateGameRoute');
jest.mock('../buildStartGameRoute');

describe('Api server router', () => {
  let expressRouter: Router, dependencies: CreateRouterDependencies;

  beforeEach(() => {
    expressRouter = ({
      post: jest.fn(),
    } as unknown) as Router;

    (Router as jest.Mock).mockReturnValue(expressRouter);

    dependencies = {
      gameRepository: createGameRepositoryMock(),
      roomRepository: createRoomRepositoryMock(),
      gameConfigValidator: createGameConfigValidatorMock(),
      playerRepository: createPlayerRepositoryMock(),
      mapRepository: createMapRepositoryMock(),
      commandRepository: createCommandRepositoryMock(),
    };
  });

  it('should create router', () => {
    const router = createRouter(dependencies);

    expect(router).toEqual(expressRouter);
  });

  it('should link create game route', () => {
    const createGameRoute = jest.fn();
    const startGameRoute = jest.fn();

    (buildCreateGameRoute as jest.Mock).mockReturnValue(createGameRoute);
    (buildStartGameRoute as jest.Mock).mockReturnValue(startGameRoute);

    createRouter(dependencies);

    expect(expressRouter.post).toHaveBeenNthCalledWith(1, '/', createGameRoute);
  });
});
