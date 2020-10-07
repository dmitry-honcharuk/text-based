import { GameRepository } from '../../GameRepository';
import { PlayerRepository } from '../../PlayerRepository';
import { RoomRepository } from '../../RoomRepository';

export function createGameRepositoryMock(): GameRepository {
  return {
    createGame: jest.fn(),
    getGameById: jest.fn(),
    startGame: jest.fn(),
  };
}

export function createRoomRepositoryMock(): RoomRepository {
  return {
    createRoom: jest.fn(),
    linkRooms: jest.fn(),
  };
}

export function createPlayerRepositoryMock(): PlayerRepository {
  return {
    createPlayer: jest.fn(),
    getGamePlayers: jest.fn(),
  };
}
