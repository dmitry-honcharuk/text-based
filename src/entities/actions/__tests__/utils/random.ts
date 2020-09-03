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
    apply() {
      if (!cb) {
        return false;
      }

      return cb(this.issuer, this.game, this.context);
    }
  }

  const player = createRandomPlayer();

  return new RandomAction(player, createRandomGame([player]), context);
}
