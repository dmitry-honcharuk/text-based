import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { PlayerData } from '../entities/PlayerData';
import { EntityMapper } from './EntityMapper';

export class PlayerDataEntityMapper extends EntityMapper<
  PlayerData,
  PlayerEntity
> {
  map(playerData: PlayerData): PlayerEntity {
    return new PlayerEntity({
      id: playerData.id,
      name: playerData.name,
    });
  }
}
