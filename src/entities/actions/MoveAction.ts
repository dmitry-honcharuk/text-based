import { BaseAction } from './BaseAction';
import { Direction } from '../Direction';

export class MoveAction extends BaseAction<{ direction: Direction }> {
  apply() {
    return this.game.map.movePlayer(this.issuer, this.context.direction);
  }
}
