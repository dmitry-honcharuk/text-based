import { RoomEntity } from '../../domain/entities/RoomEntity';
import { RoomData } from '../entities/RoomData';

export class RoomEntityMapper {
  fromEntityToData(entity: RoomEntity, gameId: string): Omit<RoomData, 'id'> {
    return {
      customId: entity.id,
      name: entity.name,
      description: entity.description,
      gameId: gameId,
      exits: entity.exits,
    };
  }

  fromDataToEntity(data: RoomData): RoomEntity {
    return {
      id: data.customId,
      name: data.name,
      description: data.description,
      exits: data.exits,
    };
  }
}
