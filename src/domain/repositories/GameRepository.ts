import { AttributeConfig } from '../entities/EntityAttributes';
import { GameEntity } from '../entities/GameEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface GameRepository {
  createGame(): Promise<string>;
  getGameById(gameId: string): Promise<GameEntity | null>;
  startGame(gameId: string): Promise<void>;
  addPlayer(playerId: string): DeferredNullable<void>;
  hasPlayer(playerId: string): Promise<boolean>;
  setDefaultPlayerAttributes(attributes: AttributeConfig[]): Promise<void>;
}
