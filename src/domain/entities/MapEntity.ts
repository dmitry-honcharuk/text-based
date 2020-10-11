import { PlayerEntity } from './PlayerEntity';
import { RoomEntity } from './RoomEntity';

export type PlayerLocations = Map<PlayerEntity, RoomEntity>;

export type MapEntity = {
  startingRoom: RoomEntity;
  playerLocations: PlayerLocations;
};
