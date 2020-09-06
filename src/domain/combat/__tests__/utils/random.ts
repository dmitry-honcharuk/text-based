import { Attackable } from '../../Attackable';
import { Attacker } from '../../Attacker';

export function createRandomAttackable(config: { health: number }): Attackable {
  let health = config.health;

  return {
    get health() {
      return health;
    },
    increaseHealth(amount: number) {
      health += amount;
    },
    decreaseHealth(amount: number) {
      health -= amount;
    }
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
