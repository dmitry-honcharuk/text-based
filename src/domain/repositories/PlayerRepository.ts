import { EntityAttributes } from '../entities/EntityAttributes';
import { PlayerEntity } from '../entities/PlayerEntity';

export interface PlayerRepository {
  createPlayer(
    gameId: string,
    playerName: string,
    attributes: EntityAttributes,
  ): Promise<string>;

  getGamePlayers(gameId: string): Promise<PlayerEntity[]>;
}
