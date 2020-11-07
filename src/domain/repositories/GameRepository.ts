import { AttributeConfig } from '../entities/EntityAttributes';
import { GameEntity, GameOptions } from '../entities/GameEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface GameRepository {
  createGame(options: GameOptions): Promise<string>;
  getGameById(gameId: string): Promise<GameEntity | null>;
  startGame(gameId: string): Promise<void>;
  addPlayer(playerId: string): DeferredNullable<void>;
  hasPlayer(playerId: string): Promise<boolean>;
  setDefaultPlayerAttributes(attributes: AttributeConfig[]): Promise<void>;
  updateGame(gameId: string, fields: UpdateGameFields): Promise<void>;
}

export type UpdateGameFields = Partial<Pick<GameEntity, 'status'>>;
