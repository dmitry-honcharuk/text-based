import { random } from 'faker';
import { GameConfigValidator } from '../../GameConfigValidator';
import { GameEntity } from '../../GameEntity';
import { MapEntity } from '../../MapEntity';
import { PlayerEntity } from '../../PlayerEntity';
import { RoomEntity, RoomEntityExit } from '../../RoomEntity';

export function createGameEntityMock(
  config: Partial<GameEntity> = {},
): GameEntity {
  const { isStarted = false, players = [] } = config;

  return {
    isStarted,
    players,
  };
}

export function createRoomEntityMock(
  config: Partial<RoomEntity> = {},
): RoomEntity {
  const {
    id = random.word(),
    name = random.word(),
    description = random.words(),
    exits = [],
  } = config;

  return {
    id,
    name,
    description,
    exits,
  };
}

export function createRoomEntityExitMock(
  config: Partial<RoomEntityExit> = {},
): RoomEntityExit {
  const {
    id = random.word(),
    name = random.word(),
    destinationRoomId = random.word(),
  } = config;

  return {
    id,
    name,
    destinationRoomId,
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

export function createMapEntityMock(
  config: Partial<MapEntity> = {},
): MapEntity {
  const {
    startingRoom = createRoomEntityMock(),
    playerLocations = new Map(),
  } = config;

  return {
    startingRoom,
    playerLocations,
  };
}
