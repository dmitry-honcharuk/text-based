import { GameEntity } from '../../domain/entities/GameEntity';
import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { GameData } from '../entities/GameData';
import { EntityMapper } from './EntityMapper';

export class GameDataEntityMapper extends EntityMapper<GameData, GameEntity> {
  map(dataEntity: GameData, players: PlayerEntity[] = []): GameEntity {
    return new GameEntity({
      id: dataEntity.id,
      isStarted: dataEntity.isStarted,
      players,
    });
  }
}
