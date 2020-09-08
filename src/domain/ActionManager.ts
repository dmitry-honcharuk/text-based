import { Player } from './Player';
import { Game } from './Game';
import { Action } from './actions/Action';

export class ActionManager {
  constructor(private game: Game) {}

  registerAction(action: Action, issuer: Player): void {
    action.apply(this.game, issuer);
  }
}
