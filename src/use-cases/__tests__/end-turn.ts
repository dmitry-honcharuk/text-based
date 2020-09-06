import { Game } from '../../domain/Game';
import {
  createRandomGame,
  createRandomPlayer,
} from '../../domain/__tests__/utils/random.util';
import { makeEndTurn } from '../end-turn';
import { Player } from '../../domain/Player';
import { createRandomAction } from '../../domain/actions/__tests__/utils/random';

describe('End turn usecase', () => {
  let game: Game, player: Player;

  beforeEach(() => {
    player = createRandomPlayer();
    game = createRandomGame([player]);
  });

  it('should run all pending actions in game', () => {
    let count = 0;
    const action1 = createRandomAction({}, () => {
      count++;
      return true;
    });
    const action2 = createRandomAction({}, () => {
      count++;
      return true;
    });
    const action3 = createRandomAction({}, () => {
      count++;
      return true;
    });

    game.registerAction(action1, player);
    game.registerAction(action2, player);
    game.registerAction(action3, player);

    const endTurn = makeEndTurn({ game });

    expect(count).toBe(0);

    endTurn();

    expect(count).toBe(3);
  });
});
