import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { PlayerData } from '../entities/PlayerData';

export class PlayerEntityMapper {
  fromDataToEntity(playerData: PlayerData): PlayerEntity {
    return {
      name: playerData.name,
    };
  }
}
