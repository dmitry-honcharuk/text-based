import { Game } from '../Game';
import { Player } from '../Player';

export abstract class BaseAction<T> {
  constructor(
    protected issuer: Player,
    protected game: Game,
    protected context: T,
  ) {}

  abstract apply(): boolean;
}
