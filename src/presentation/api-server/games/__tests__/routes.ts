import { Router } from 'express';
import { buildCreateGameRoute } from '../buildCreateGameRoute';
import { createGameConfigValidatorMock } from '../../../../domain/entities/__tests__/utils/mocks';
import {
  createGameRepositoryMock,
  createRoomRepositoryMock,
} from '../../../../domain/repositories/__tests__/utils/mocks';

import { createRouter } from '../routes';

jest.mock('express');
jest.mock('../buildCreateGameRoute');

describe('Api server router', () => {
  it('should create router', () => {
    const expressRouter = {
      post: jest.fn(),
    };
    const createGameRoute = jest.fn();

    (Router as jest.Mock).mockReturnValue(expressRouter);
    (buildCreateGameRoute as jest.Mock).mockReturnValue(createGameRoute);

    const router = createRouter({
      gameRepository: createGameRepositoryMock(),
      roomRepository: createRoomRepositoryMock(),
      gameConfigValidator: createGameConfigValidatorMock(),
    });

    expect(router).toEqual(expressRouter);
    expect(expressRouter.post).toHaveBeenCalledWith('/', createGameRoute);
  });
});
