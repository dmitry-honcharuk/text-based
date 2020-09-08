import { random } from 'faker';

import { Attackable } from '../../Attackable';
import { Attacker } from '../../Attacker';

export function createRandomAttackable(): Attackable {
  return {
    get health() {
      return random.number();
    },
    increaseHealth: jest.fn(),
    decreaseHealth: jest.fn(),
  };
}

export function createRandomAttacker(config: { damage: number }): Attacker {
  return {
    damage: config.damage,
    attack(target: Attackable, amount: number) {
      target.decreaseHealth(amount)
    },
  };
}
