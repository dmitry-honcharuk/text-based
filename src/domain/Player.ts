import { Attackable, DEFAULT_HEALTH } from './combat/Attackable';
import { Attacker, DEFAULT_DAMAGE } from './combat/Attacker';

export interface PlayerConfig {
  name: string;
  health?: number;
  damage?: number;
}

export class Player implements Attackable, Attacker {
  private readonly _name: string;
  private _health: number;
  private _damage: number;

  constructor(config: PlayerConfig) {
    this._name = config.name;
    this._health = config.health ?? DEFAULT_HEALTH;
    this._damage = config.damage ?? DEFAULT_DAMAGE;
  }

  decreaseHealth(amount: number) {
    this._health = Math.max(this._health - amount, 0);
  }

  increaseHealth(amount: number) {
    this._health += amount;
  }

  attack(target: Attackable, amount: number) {
    target.decreaseHealth(amount);
  }

  get name(): string {
    return this._name;
  }

  get health(): number {
    return this._health;
  }

  get damage(): number {
    return this._damage;
  }
}
