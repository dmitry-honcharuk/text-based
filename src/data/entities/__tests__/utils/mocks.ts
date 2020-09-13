import { random } from 'faker';
import { GameData, Config as GameDataConfig } from '../../GameData';
import { RoomData, Config as RoomDataConfig } from '../../RoomData';

export function createGameDataMock(config: Partial<GameDataConfig> = {}) {
  const { id = random.word() } = config;

  return new GameData({ id });
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
