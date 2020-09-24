import { random } from 'faker';
import express, { Express, json } from 'express';
import cors from 'cors';

import { createGameConfigValidatorMock } from '../../../domain/entities/__tests__/utils/mocks';
import {
  createGameRepositoryMock,
  createRoomRepositoryMock,
} from '../../../domain/repositories/__tests__/utils/mocks';
import { Server } from '../Server';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';
import { GameConfigValidator } from '../../../domain/entities/GameConfigValidator';
import { createRouter } from '../router';

jest.mock('express');
jest.mock('cors');
jest.mock('../router');

describe('Server', () => {
  let gameRepository: GameRepository,
    roomRepository: RoomRepository,
    gameConfigValidator: GameConfigValidator,
    expressAppMock: Express;

  beforeEach(() => {
    gameRepository = createGameRepositoryMock();
    roomRepository = createRoomRepositoryMock();
    gameConfigValidator = createGameConfigValidatorMock();
    expressAppMock = ({
      use: jest.fn(),
      listen: jest.fn(),
      json: jest.fn(),
    } as unknown) as Express;

    ((express as unknown) as jest.Mock).mockReturnValueOnce(expressAppMock);
  });

  it('should not throw on run', () => {
    const server = new Server(
      gameRepository,
      roomRepository,
      gameConfigValidator,
    );

    expect(() => {
      server.run({ port: random.number(10000) });
    }).not.toThrow();
  });

  it('should listen on given port', () => {
    const port = random.number(10000);

    const server = new Server(
      gameRepository,
      roomRepository,
      gameConfigValidator,
    );

    server.run({ port });

    expect(expressAppMock.listen).toHaveBeenCalledWith(
      port,
      expect.any(Function),
    );
  });

  it('should use middlewares and router', () => {
    const port = random.number(10000);
    const corsReturn = jest.fn();
    const jsonReturn = jest.fn();
    const routerReturn = jest.fn();

    (cors as jest.Mock).mockReturnValueOnce(corsReturn);
    (json as jest.Mock).mockReturnValueOnce(jsonReturn);
    (createRouter as jest.Mock).mockReturnValueOnce(routerReturn);

    const server = new Server(
      gameRepository,
      roomRepository,
      gameConfigValidator,
    );

    server.run({ port });

    expect(expressAppMock.use).toHaveBeenNthCalledWith(1, corsReturn);
    expect(expressAppMock.use).toHaveBeenNthCalledWith(2, jsonReturn);
    expect(expressAppMock.use).toHaveBeenNthCalledWith(3, routerReturn);
  });
});
