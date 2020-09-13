import { EntityMapper } from './EntityMapper';
import { RoomEntity } from '../../domain/entities/RoomEntity';
import { RoomData } from '../entities/RoomData';

export class RoomEntityDataMapper extends EntityMapper<RoomEntity, RoomData> {
  map(entity: RoomEntity): RoomData {
    return new RoomData({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      gameId: entity.gameId,
    });
  }
}
