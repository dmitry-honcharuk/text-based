import { BaseAction } from '../../BaseAction';
import { Player } from '../../../Player';
import { Game } from '../../../Game';
import {
  createRandomPlayer,
  createRandomGame,
} from '../../../__tests__/utils/random.util';

interface Callback<T> {
  (issuer: Player, game: Game, context: T): boolean;
}

export function createRandomAction<T>(context: T, cb?: Callback<T>) {
  class RandomAction extends BaseAction<T> {
    apply(game: Game, issuer: Player) {
      if (!cb) {
        return false;
      }

      return cb(issuer, game, this.context);
    }
  }

  const player = createRandomPlayer();

  return new RandomAction(context);
}
