import { GameEntity } from '../entities/GameEntity';

export interface GameRepository {
  createGame(): Promise<GameEntity>;
  getGameById(gameId: string): Promise<GameEntity | null>;
  startGame(gameId: string): Promise<void>;
}
