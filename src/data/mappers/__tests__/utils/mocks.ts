import { GameEntityMapper } from '../../GameEntityMapper';
import { PlayerEntityMapper } from '../../PlayerEntityMapper';
import { RoomEntityMapper } from '../../RoomEntityMapper';

type MapperImplementations = {
  fromDataToEntity?: () => any;
  fromEntityToData?: () => any;
};

export function createGameEntityMapperMock(
  impl?: Omit<MapperImplementations, 'fromEntityToData'>,
): GameEntityMapper {
  return {
    fromDataToEntity: jest.fn(impl?.fromDataToEntity),
  };
}

export function createPlayerEntityMapperMock(
  impl?: Omit<MapperImplementations, 'fromEntityToData'>,
): PlayerEntityMapper {
  return {
    fromDataToEntity: jest.fn(impl?.fromDataToEntity),
  };
}

export function createRoomEntityMapperMock(
  impl?: MapperImplementations,
): RoomEntityMapper {
  return {
    fromDataToEntity: jest.fn(impl?.fromDataToEntity),
    fromEntityToData: jest.fn(impl?.fromEntityToData),
  };
}
