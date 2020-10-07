import cors from 'cors';
import express, { Express, json } from 'express';
import { random } from 'faker';
import { GameConfigValidator } from '../../../domain/entities/GameConfigValidator';
import { createGameConfigValidatorMock } from '../../../domain/entities/__tests__/utils/mocks';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { PlayerRepository } from '../../../domain/repositories/PlayerRepository';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';
import {
  createGameRepositoryMock,
  createPlayerRepositoryMock,
  createRoomRepositoryMock,
} from '../../../domain/repositories/__tests__/utils/mocks';
import { createRouter } from '../router';
import { Server } from '../Server';

jest.mock('express');
jest.mock('cors');
jest.mock('../router');

describe('Server', () => {
  let gameRepo: GameRepository,
    roomRepo: RoomRepository,
    playerRepo: PlayerRepository,
    gameConfigValidator: GameConfigValidator,
    expressAppMock: Express;

  beforeEach(() => {
    gameRepo = createGameRepositoryMock();
    roomRepo = createRoomRepositoryMock();
    playerRepo = createPlayerRepositoryMock();
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
      gameRepo,
      roomRepo,
      gameConfigValidator,
      playerRepo,
    );

    expect(() => {
      server.run({ port: random.number(10000) });
    }).not.toThrow();
  });

  it('should listen on given port', () => {
    const port = random.number(10000);

    const server = new Server(
      gameRepo,
      roomRepo,
      gameConfigValidator,
      playerRepo,
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
      gameRepo,
      roomRepo,
      gameConfigValidator,
      playerRepo,
    );

    server.run({ port });

    expect(expressAppMock.use).toHaveBeenNthCalledWith(1, corsReturn);
    expect(expressAppMock.use).toHaveBeenNthCalledWith(2, jsonReturn);
    expect(expressAppMock.use).toHaveBeenNthCalledWith(3, routerReturn);
  });
});
