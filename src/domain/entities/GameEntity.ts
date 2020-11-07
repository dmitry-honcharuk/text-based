import { Condition } from './Condition';
import { EntityAttributes } from './EntityAttributes';
import { PlayerEntity } from './PlayerEntity';

export enum GameStatus {
  Pending = 'pending',
  Started = 'started',
  Lost = 'lost',
  Won = 'won',
}

export type GameEntity = {
  status: GameStatus;
  players: PlayerEntity[];
  defaultPlayerAttributes: EntityAttributes;
  options: GameOptions;
};

export interface GameOptions {
  winConditions: Condition[];
  looseConditions: Condition[];
}

export function isGameStarted(game: GameEntity): boolean {
  return game.status === GameStatus.Started;
}
