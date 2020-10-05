import { random } from 'faker';
import { Config as GameDataConfig, GameData } from '../../GameData';
import { IdGenerator } from '../../IdGenerator';
import { Config as RoomDataConfig, RoomData } from '../../RoomData';

export function createGameDataMock(
  config: Partial<GameDataConfig> = {},
): GameData {
  const { id = random.word() } = config;

  return {
    id,
    isStarted: false,
  } as GameData;
}

export function createRoomDataMock(
  config: Partial<RoomDataConfig> = {},
): RoomData {
  const {
    id = random.word(),
    name = random.word(),
    description = random.word(),
    gameId = random.word(),
    exits = [],
  } = config;

  return ({
    id,
    name,
    description,
    gameId,
    exits,
    addExit: jest.fn(),
  } as unknown) as RoomData;
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
