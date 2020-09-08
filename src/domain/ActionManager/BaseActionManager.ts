import { BaseAction } from '../actions/BaseAction';
import { Player } from '../Player';
import { ActionManager } from './ActionManager';
import { Game } from '../Game';

export class BaseActionManager implements ActionManager {
  constructor(private game: Game) {}

  registerAction(action: BaseAction<unknown>, issuer: Player): void {
    action.apply(this.game, issuer);
  }
}
