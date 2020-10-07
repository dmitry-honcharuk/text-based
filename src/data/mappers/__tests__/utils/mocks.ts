import { GameEntityMapper } from '../../GameEntityMapper';
import { PlayerEntityMapper } from '../../PlayerEntityMapper';
import { RoomEntityDataMapper } from '../../RoomEntityDataMapper';

export function createRoomEntityDataMapperMock() {
  return new RoomEntityDataMapper();
}

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
