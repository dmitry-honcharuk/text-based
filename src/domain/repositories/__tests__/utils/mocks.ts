import { CommandRepository } from '../../CommandRepository';
import { GameRepository } from '../../GameRepository';
import { MapRepository } from '../../MapRepository';
import { ObjectRepository } from '../../ObjectRepository';
import { PlayerRepository } from '../../PlayerRepository';
import { RoomRepository } from '../../RoomRepository';

export function createGameRepositoryMock(): GameRepository {
  return {
    createGame: jest.fn(),
    getGameById: jest.fn(),
    startGame: jest.fn(),
    addPlayer: jest.fn(),
    hasPlayer: jest.fn(),
    setDefaultPlayerAttributes: jest.fn(),
    updateGame: jest.fn(),
  };
}

export function createRoomRepositoryMock(): RoomRepository {
  return {
    getRoomById: jest.fn(),
    createRoom: jest.fn(),
    linkRooms: jest.fn(),
    getRoomIdByCustomId: jest.fn(),
    getGameRoomIds: jest.fn(),
    updateState: jest.fn(),
  };
}

export function createPlayerRepositoryMock(): PlayerRepository {
  return {
    createPlayer: jest.fn(),
    getGamePlayers: jest.fn(),
  };
}

export function createMapRepositoryMock(): MapRepository {
  return {
    getPlayerRoom: jest.fn(),
    setPlayerLocation: jest.fn(),
    getGameStartingRoomId: jest.fn(),
    createMap: jest.fn(),
    spawnPlayer: jest.fn(),
  };
}

export function createCommandRepositoryMock(): CommandRepository {
  return {
    addGlobalCommand: jest.fn(),
    getGlobalEffect: jest.fn(),
    addRoomCommand: jest.fn(),
    getRoomEffects: jest.fn(),
  };
}

export function createObjectRepositoryMock(): ObjectRepository {
  return {
    createObject: jest.fn(),
    getRoomObject: jest.fn(),
    updateObjectAttribute: jest.fn(),
    getObjectsFromRooms: jest.fn(),
  };
}
