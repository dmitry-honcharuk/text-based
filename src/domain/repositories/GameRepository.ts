import { GameEntity } from '../entities/GameEntity';

export interface GameRepository {
  createGame(): Promise<GameEntity>;
}
