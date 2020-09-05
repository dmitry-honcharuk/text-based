import { BaseAction } from './BaseAction';
import { Game } from '../Game';
import { Player } from '../Player';

export class MoveAction extends BaseAction<{ direction: string }> {
  apply(game: Game, issuer: Player) {
    return game.map.movePlayer(issuer, this.context.direction);
  }
}
