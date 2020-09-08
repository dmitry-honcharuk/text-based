import { Game } from '../Game';
import { Player } from '../Player';

export interface Action {
  apply: (game: Game, issuer: Player) => void;
}
