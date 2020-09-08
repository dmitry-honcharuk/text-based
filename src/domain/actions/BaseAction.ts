import { Game } from '../Game';
import { Player } from '../Player';
import { Action } from './Action';

export abstract class BaseAction<T> implements Action {
  constructor(protected context: T) {}

  abstract apply(game: Game, issuer: Player): void;
}
