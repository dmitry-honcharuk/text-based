import { RoomEntity } from '../../domain/entities/RoomEntity';
import { RoomData } from '../entities/RoomData';

export class RoomEntityMapper {
  fromEntityToData(entity: RoomEntity, gameId: string): Omit<RoomData, 'id'> {
    return {
      customId: entity.id,
      name: entity.name,
      description: entity.description,
      statusDescriptions: entity.statusDescriptions,
      gameId: gameId,
      exits: entity.exits,
      state: entity.state,
      statuses: new Set(entity.statuses),
    };
  }

  fromDataToEntity(data: RoomData): RoomEntity {
    return {
      id: data.customId,
      name: data.name,
      description: data.description,
      statusDescriptions: data.statusDescriptions,
      exits: data.exits,
      state: data.state,
      statuses: [...data.statuses],
    };
  }
}
