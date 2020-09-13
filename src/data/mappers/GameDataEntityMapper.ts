import { EntityMapper } from './EntityMapper';
import { GameEntity } from '../../domain/entities/GameEntity';
import { GameData } from '../entities/GameData';

export class GameDataEntityMapper extends EntityMapper<GameData, GameEntity> {
  map(dataEntity: GameData): GameEntity {
    return new GameEntity(dataEntity.id);
  }
}
