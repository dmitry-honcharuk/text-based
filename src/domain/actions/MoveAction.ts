import { BaseAction } from './BaseAction';
import { Game } from '../Game';
import { Player } from '../Player';
import { Action } from './Action';
import { NoSuchPlayerError } from '../../Errors/NoSuchPlayerError';
import { WrongDestinationError } from '../../Errors/WrongDestinationError';

export class MoveAction extends BaseAction<{ direction: string }> implements Action {
  apply(game: Game, issuer: Player) {
    const location = game.map.getPlayerLocation(issuer);

    if (!location) {
      throw new NoSuchPlayerError(issuer.name);
    }

    const destination = location.getDestination(this.context.direction);

    if (!destination) {
      throw new WrongDestinationError(this.context.direction);
    }

    game.map.setPLayerLocation(issuer, destination);
  }
}
