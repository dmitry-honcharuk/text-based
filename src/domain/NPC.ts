import { Attackable, DEFAULT_HEALTH } from './combat/Attackable';
import { Attacker, DEFAULT_DAMAGE } from './combat/Attacker';

export interface NPCConfig {
  id: string;
  name: string;
  health?: number;
  damage?: number;
}

export class NPC implements Attackable, Attacker {
  private readonly _id: string;
  private readonly _name: string;
  private _health: number;
  private _damage: number;

  constructor(config: NPCConfig) {
    this._id = config.id;
    this._name = config.name;
    this._health = config.health ?? DEFAULT_HEALTH;
    this._damage = config.damage ?? DEFAULT_DAMAGE;
  }

  increaseHealth(amount: number) {
    this._health += amount;
  }

  decreaseHealth(amount: number) {
    this._health = Math.max(this._health - amount, 0);
  }

  attack(target: Attackable, amount: number) {
    target.decreaseHealth(amount);
  }

  get id(): string {
    return this._id;
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
