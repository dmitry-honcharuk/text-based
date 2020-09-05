import { Game } from '../Game';
import { Player } from '../Player';

export abstract class BaseAction<T> {
  constructor(protected context: T) {}

  abstract apply(game: Game, issuer: Player): boolean;
}
