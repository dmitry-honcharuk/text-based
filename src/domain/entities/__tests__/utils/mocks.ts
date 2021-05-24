import { random } from 'faker';
import { EntityAttributes } from '../../EntityAttributes';
import { GameConfigValidator } from '../../GameConfigValidator';
import { GameEntity, GameOptions, GameStatus } from '../../GameEntity';
import { MapEntity } from '../../MapEntity';
import { PlayerEntity } from '../../PlayerEntity';
import { RoomEntity, RoomEntityExit, RoomState } from '../../RoomEntity';

export function createGameEntityMock(
  config: Partial<GameEntity> = {},
): GameEntity {
  const {
    status = GameStatus.Pending,
    players = [],
    defaultPlayerAttributes = createEntityAttributesMock(),
    options = createGameOptionsMock(),
  } = config;

  return {
    status,
    players,
    defaultPlayerAttributes,
    options,
  };
}

export function createGameOptionsMock(): GameOptions {
  return {
    winConditions: [],
    looseConditions: [],
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
    state = RoomState.Idle,
  } = config;

  return {
    id,
    name,
    description,
    exits,
    state,
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
  return {
    validate: jest.fn(),
  } as unknown as GameConfigValidator;
}

export function createPlayerEntityMock(
  config: Partial<PlayerEntity> = {},
): PlayerEntity {
  const { name = random.word(), attributes = createEntityAttributesMock() } =
    config;

  return { name, attributes };
}

export function createMapEntityMock(
  config: Partial<MapEntity> = {},
): MapEntity {
  const { startingRoom = createRoomEntityMock(), playerLocations = new Map() } =
    config;

  return {
    startingRoom,
    playerLocations,
  };
}

export function createEntityAttributesMock(): EntityAttributes {
  return new Map();
}
