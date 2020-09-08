import { ActionManager } from '../ActionManager';
import { createRandomGame, createRandomPlayer } from './utils/random.util';
import { createRandomAction } from '../actions/__tests__/utils/random';

describe('Action manager', () => {
  it('should properly register action', () => {
    const game = createRandomGame();
    const player = createRandomPlayer();
    const action = createRandomAction();

    const manager = new ActionManager(game);

    manager.registerAction(action, player);

    expect(action.apply).toHaveBeenCalledWith(game, player)
  });
});
