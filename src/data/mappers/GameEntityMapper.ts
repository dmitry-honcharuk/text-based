import { EntityAttributes } from '../../domain/entities/EntityAttributes';
import { GameEntity } from '../../domain/entities/GameEntity';
import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { GameData } from '../entities/GameData';

export class GameEntityMapper {
  fromDataToEntity(
    dataEntity: GameData,
    players: PlayerEntity[] = [],
    defaultPlayerAttributes: EntityAttributes,
  ): GameEntity {
    return {
      isStarted: dataEntity.isStarted,
      players,
      defaultPlayerAttributes,
    };
  }
}
