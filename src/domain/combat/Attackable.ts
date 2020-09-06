export const DEFAULT_HEALTH = 10;

export interface Attackable {
  health: number;
  decreaseHealth: (amount: number) => void;
  increaseHealth: (amount: number) => void;
}
