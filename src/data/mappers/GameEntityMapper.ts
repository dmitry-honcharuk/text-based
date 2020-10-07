import { GameEntity } from '../../domain/entities/GameEntity';
import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { GameData } from '../entities/GameData';

export class GameEntityMapper {
  fromDataToEntity(
    dataEntity: GameData,
    players: PlayerEntity[] = [],
  ): GameEntity {
    return new GameEntity({
      id: dataEntity.id,
      isStarted: dataEntity.isStarted,
      players,
    });
  }
}
