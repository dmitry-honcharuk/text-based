import { TriggerConfig } from '../EffectTrigger';
import { AttributeConfig } from '../EntityAttributes';
import { GameOptions } from '../GameEntity';

export interface GameConfig {
  game: GameOptions;
  startingRoom: string;
  rooms: RoomConfig[];
  playerAttributes?: AttributeConfig[];
}

export interface RoomConfig {
  id: string;
  name: string;
  description: string;
  exits?: RoomExitConfig[];
  objects?: ObjectConfig[];
}

export interface RoomExitConfig {
  id: string;
  name: string;
  roomId: string;
}

export interface RoomWithExitsConfig extends RoomConfig {
  exits: RoomExitConfig[];
}

export interface ObjectConfig {
  id: string;
  name: string;
  attributes?: AttributeConfig[];
  triggers: TriggerConfig[];
}
