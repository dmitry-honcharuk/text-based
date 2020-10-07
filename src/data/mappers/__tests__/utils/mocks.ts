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
