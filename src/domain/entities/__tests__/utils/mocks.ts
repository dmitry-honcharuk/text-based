import { random } from 'faker';
import { GameConfigValidator } from '../../GameConfigValidator';
import { GameEntity } from '../../GameEntity';
import { PlayerEntity } from '../../PlayerEntity';
import { RoomEntity } from '../../RoomEntity';

export function createGameEntityMock(
  config: Partial<GameEntity> = {},
): GameEntity {
  const { isStarted = false, players = [] } = config;

  return {
    isStarted,
    players,
  };
}

export function createRoomEntityMock(config: Partial<RoomEntity> = {}) {
  const {
    id = random.word(),
    name = random.word(),
    description = random.words(),
  } = config;

  return {
    id,
    name,
    description,
  };
}

export function createGameConfigValidatorMock(): GameConfigValidator {
  return ({
    validate: jest.fn(),
  } as unknown) as GameConfigValidator;
}

export function createPlayerEntityMock(
  config: Partial<PlayerEntity> = {},
): PlayerEntity {
  const { name = random.word() } = config;

  return { name };
}
