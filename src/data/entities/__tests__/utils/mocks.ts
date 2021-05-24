import { random } from 'faker';
import { GameStatus } from '../../../../domain/entities/GameEntity';
import { RoomState } from '../../../../domain/entities/RoomEntity';
import {
  createEntityAttributesMock,
  createGameOptionsMock,
} from '../../../../domain/entities/__tests__/utils/mocks';
import { GameData } from '../../GameData';
import { IdGenerator } from '../../IdGenerator';
import { MapData } from '../../MapData';
import { PlayerData } from '../../PlayerData';
import { RoomData } from '../../RoomData';

export function createGameDataMock(config: Partial<GameData> = {}): GameData {
  const {
    id = random.word(),
    status = GameStatus.Pending,
    options = createGameOptionsMock(),
  } = config;

  return {
    id,
    status,
    options,
  };
}

export function createRoomDataMock(config: Partial<RoomData> = {}): RoomData {
  const {
    id = random.word(),
    customId = random.word(),
    name = random.word(),
    description = random.word(),
    gameId = random.word(),
    exits = [],
    state = RoomState.Idle,
  } = config;

  return {
    id,
    customId,
    name,
    description,
    gameId,
    exits,
    state,
  };
}

export function createIdGeneratorMock(ids: string[] = []): IdGenerator {
  let currentIndex = 0;

  return {
    next: jest.fn(() => {
      if (ids.length > currentIndex) {
        return ids[currentIndex++];
      }

      return random.word();
    }),
  };
}

export function createPlayerDataMock(
  config: Partial<PlayerData> = {},
): PlayerData {
  const {
    id = random.word(),
    name = random.word(),
    gameId = random.word(),
    attributes = createEntityAttributesMock(),
  } = config;

  return {
    id,
    name,
    gameId,
    attributes,
  };
}

export function createMapDataMock(config: Partial<MapData> = {}): MapData {
  const {
    gameId = random.word(),
    startingRoomId = random.word(),
    playerLocations = new Map(),
  } = config;

  return {
    gameId,
    startingRoomId,
    playerLocations,
  };
}
