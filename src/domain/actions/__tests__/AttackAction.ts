import { random } from 'faker';
import { AttackAction } from '../AttackAction';
import {
  createRandomGame,
  createRandomMap, createRandomNpc,
  createRandomPlayer,
  createRandomRoom
} from '../../__tests__/utils/random.util';
import { GameMap } from '../../GameMap';
import { Game } from '../../Game';
import { Player } from '../../Player';
import { WrongAttackTargetError } from '../../../Errors/WrongAttackTargetError';
import { NoSuchPlayerError } from '../../../Errors/NoSuchPlayerError';

describe('Attack Action', () => {
  let map: GameMap, game: Game, player: Player, target: string;

  beforeEach(() => {
    player = createRandomPlayer();
    map = createRandomMap();
    game = createRandomGame([], map);
    target = random.word();
  });

  it('should throw if player is not in the game', () => {
    const action = new AttackAction({ target });

    expect(() => {
      action.apply(game, player)
    }).toThrowError(new NoSuchPlayerError(player.name));
  });

  it('should throw if target is wrong', () => {
    game.addPlayer(player);

    const action = new AttackAction({ target });

    expect(() => {
      action.apply(game, player)
    }).toThrowError(new WrongAttackTargetError(target));
  });

  it('should properly attack an npc', () => {
    const npc = createRandomNpc({
      id: target,
    });
    const map = createRandomMap(createRandomRoom({
      npc: [npc],
    }));
    const game = createRandomGame([], map);

    game.addPlayer(player);

    const action = new AttackAction({ target });

    expect(() => {
      action.apply(game, player)
    }).not.toThrow();
  });
});
