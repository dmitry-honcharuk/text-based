import { Router } from 'express';
import { createRouter as createGamesRouter } from '../games';

import { createGameConfigValidatorMock } from '../../../domain/entities/__tests__/utils/mocks';
import {
  createGameRepositoryMock,
  createRoomRepositoryMock,
} from '../../../domain/repositories/__tests__/utils/mocks';
import { createRouter } from '../router';

jest.mock('express');
jest.mock('../games');

describe('Api server router', () => {
  it('should create router', () => {
    const expressRouter = {
      use: jest.fn(),
    };
    const gameRouter = jest.fn();

    (Router as jest.Mock).mockReturnValue(expressRouter);
    (createGamesRouter as jest.Mock).mockReturnValue(gameRouter);

    const router = createRouter({
      gameRepository: createGameRepositoryMock(),
      roomRepository: createRoomRepositoryMock(),
      gameConfigValidator: createGameConfigValidatorMock(),
    });

    expect(router).toEqual(expressRouter);
    expect(expressRouter.use).toHaveBeenCalledWith('/games', gameRouter);
  });
});
