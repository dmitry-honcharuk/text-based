import { random } from 'faker';
import { GameConfigValidator } from '../../GameConfigValidator';
import { Config as GameEntityConfig, GameEntity } from '../../GameEntity';
import { Config as RoomEntityConfig, RoomEntity } from '../../RoomEntity';

export function createGameEntityMock(
  config: Partial<GameEntityConfig & { isStarted: boolean }> = {},
): GameEntity {
  const { id = random.word(), isStarted = false } = config;

  return {
    id,
    isStarted,
  } as GameEntity;
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

export function createGameConfigValidatorMock(): GameConfigValidator {
  return ({
    validate: jest.fn(),
  } as unknown) as GameConfigValidator;
}
