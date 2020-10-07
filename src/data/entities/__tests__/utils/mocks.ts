import { random } from 'faker';
import { GameData } from '../../GameData';
import { IdGenerator } from '../../IdGenerator';
import { PlayerData } from '../../PlayerData';
import { RoomData } from '../../RoomData';

export function createGameDataMock(config: Partial<GameData> = {}): GameData {
  const { id = random.word(), isStarted = false } = config;

  return {
    id,
    isStarted,
  };
}

export function createRoomDataMock(config: Partial<RoomData> = {}): RoomData {
  const {
    id = random.word(),
    name = random.word(),
    description = random.word(),
    gameId = random.word(),
    exits = [],
  } = config;

  return {
    id,
    name,
    description,
    gameId,
    exits,
  };
}

export function createIdGeneratorMock(ids: string[] = []): IdGenerator {
  let currentIndex = 0;

  return {
    next: jest.fn(() => {
      if (ids.length >= currentIndex) {
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
  } = config;

  return {
    id,
    name,
    gameId,
  };
}
