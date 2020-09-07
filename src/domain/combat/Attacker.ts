import { Attackable } from './Attackable';

export const DEFAULT_DAMAGE = 1;

export interface Attacker {
  damage: number;
  attack: (target: Attackable, amount: number) => void;
}
