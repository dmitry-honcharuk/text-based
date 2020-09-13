import { random } from 'faker';
import { GameEntity } from '../../GameEntity';
import { RoomEntity, Config as RoomEntityConfig } from '../../RoomEntity';

export function createGameEntityMock(config: { id: string }) {
  const { id = random.word() } = config;

  return new GameEntity({ id });
}

export function createRoomEntityMock(config: Partial<RoomEntityConfig> = {}) {
  const {
    id = random.word(),
    name = random.word(),
    description = random.words(),
    gameId = random.word(),
  } = config;

  return new RoomEntity({
    id,
    name,
    description,
    gameId,
  });
}
