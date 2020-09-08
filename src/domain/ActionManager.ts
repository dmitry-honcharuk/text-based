import { BaseAction } from './actions/BaseAction';
import { Player } from './Player';
import { Game } from './Game';

export class ActionManager {
  constructor(private game: Game) {}

  registerAction(action: BaseAction<unknown>, issuer: Player): void {
    action.apply(this.game, issuer);
  }
}
