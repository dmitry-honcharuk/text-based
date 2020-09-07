import { name, random } from 'faker';

import { Game } from '../../Game';
import {
  createRandomGame,
  createRandomMap,
  createRandomPlayer,
  createRandomRoom,
} from '../../__tests__/utils/random.util';
import { GameMap } from '../../GameMap';
import { Room } from '../../Room';
import { AttackAction } from '../AttackAction';
import { createRandomAttackable } from '../../combat/__tests__/utils/random';

describe('Attack Action', () => {
  let lobby: Room, map: GameMap, game: Game;

  beforeEach(() => {
    lobby = createRandomRoom();
    map = createRandomMap(lobby);
    game = createRandomGame([], map);
  });

  it('should properly attack an npc', () => {
    const attackableId = random.word();
    const health = random.number();
    const playerDamage = random.number(health - 1);

    const attackable = createRandomAttackable({ health });
    const attacker = createRandomPlayer({
      name: name.firstName(),
      damage: playerDamage,
    });

    lobby.addAttackable(attackableId, attackable);

    game.addPlayer(attacker);

    const attack = new AttackAction({
      target: attackableId,
    });

    game.registerAction(attack, attacker);

    expect(attackable.health).toBe(health);

    game.applyActions();

    expect(attackable.health).toBe(health - playerDamage);
  });
});
