import { Game } from '../Game';
import { Player } from '../Player';

import { BaseAction } from './BaseAction';

export class AttackAction extends BaseAction<{ target: string }> {
  apply(game: Game, issuer: Player) {
    const room = game.map.getPlayerLocation(issuer);

    if (!room) {
      return false;
    }

    const attackable = room.getAttackable(this.context.target);

    if (!attackable) {
      return false;
    }

    issuer.attack(attackable, issuer.damage);

    return true;
  }
}
