import { GameEntityMapper } from '../../GameEntityMapper';
import { PlayerDataEntityMapper } from '../../PlayerDataEntityMapper';
import { RoomEntityDataMapper } from '../../RoomEntityDataMapper';

export function createRoomEntityDataMapperMock() {
  return new RoomEntityDataMapper();
}

export function createPlayerDataEntityMapperMock(): PlayerDataEntityMapper {
  return {
    map: jest.fn(),
  };
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
