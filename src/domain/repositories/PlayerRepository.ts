import { PlayerEntity } from '../entities/PlayerEntity';

export interface PlayerRepository {
  createPlayer(gameId: string, playerName: string): Promise<string>;

  getGamePlayers(gameId: string): Promise<PlayerEntity[]>;
}
