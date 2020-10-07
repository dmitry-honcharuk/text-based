import { PlayerEntity } from './PlayerEntity';

export type GameEntity = {
  isStarted: boolean;
  players: PlayerEntity[];
};
