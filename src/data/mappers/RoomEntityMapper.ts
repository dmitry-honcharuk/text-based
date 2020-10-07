import { RoomEntity } from '../../domain/entities/RoomEntity';
import { RoomData } from '../entities/RoomData';

export class RoomEntityMapper {
  fromEntityToData(entity: RoomEntity): RoomData {
    return new RoomData({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      gameId: entity.gameId,
    });
  }
}
