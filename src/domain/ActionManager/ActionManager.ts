import { BaseAction } from '../actions/BaseAction';
import { Player } from '../Player';

export interface ActionManager {
  registerAction(action: BaseAction<unknown>, issuer: Player): void;
}
