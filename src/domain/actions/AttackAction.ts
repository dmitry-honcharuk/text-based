import { Game } from '../Game';
import { Player } from '../Player';

import { BaseAction } from './BaseAction';
import { Action } from './Action';
import { NoSuchPlayerError } from '../../Errors/NoSuchPlayerError';
import { WrongAttackTargetError } from '../../Errors/WrongAttackTargetError';

export class AttackAction extends BaseAction<{ target: string }> implements Action {
  apply(game: Game, issuer: Player): void {
    const room = game.map.getPlayerLocation(issuer);

    if (!room) {
      throw new NoSuchPlayerError(issuer.name);
    }

    const attackable = room.getAttackable(this.context.target);

    if (!attackable) {
      throw new WrongAttackTargetError(this.context.target)
    }

    issuer.attack(attackable, issuer.damage);
  }
}
