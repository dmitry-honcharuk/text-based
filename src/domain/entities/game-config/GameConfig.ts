import { EffectTriggerConfig } from '../EffectTrigger';
import { AttributeConfig } from '../EntityAttributes';
import { GameOptions } from '../GameEntity';
import { StatusDescription } from '../RoomEntity';

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
  statusDescriptions?: StatusDescription[];
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
  aliases?: string[];
  attributes?: AttributeConfig[];
  triggers: EffectTriggerConfig[];
}
