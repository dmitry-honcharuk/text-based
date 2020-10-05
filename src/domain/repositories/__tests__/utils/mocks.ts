import { GameRepository } from '../../GameRepository';
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
