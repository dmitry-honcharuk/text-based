import { random } from 'faker';
import { GameConfigValidator } from '../../GameConfigValidator';
import { Config as GameEntityConfig, GameEntity } from '../../GameEntity';
import { Config as PlayerEntityConfig, PlayerEntity } from '../../PlayerEntity';
import { Config as RoomEntityConfig, RoomEntity } from '../../RoomEntity';

export function createGameEntityMock(
  config: Partial<GameEntityConfig & { isStarted: boolean }> = {},
): GameEntity {
  const { isStarted = false } = config;

  return {
    isStarted,
  } as GameEntity;
}

export function createRoomEntityMock(config: Partial<RoomEntityConfig> = {}) {
  const {
    id = random.word(),
    name = random.word(),
    description = random.words(),
  } = config;

  return new RoomEntity({
    id,
    name,
    description,
  });
}

export function createGameConfigValidatorMock(): GameConfigValidator {
  return ({
    validate: jest.fn(),
  } as unknown) as GameConfigValidator;
}

export function createPlayerEntityMock(
  config: Partial<PlayerEntityConfig> = {},
): PlayerEntity {
  const { name = random.word() } = config;

  return { name };
}
