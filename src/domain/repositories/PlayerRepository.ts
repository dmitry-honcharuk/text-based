import { PlayerEntity } from '../entities/PlayerEntity';

export interface PlayerRepository {
  createPlayer(playerName: string, gameId: string): Promise<PlayerEntity>;

  getGamePlayers(gameId: string): Promise<PlayerEntity[]>;
}
