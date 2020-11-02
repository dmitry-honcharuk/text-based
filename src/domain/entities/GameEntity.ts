import { EntityAttributes } from './EntityAttributes';
import { PlayerEntity } from './PlayerEntity';

export type GameEntity = {
  isStarted: boolean;
  players: PlayerEntity[];
  defaultPlayerAttributes: EntityAttributes;
};
