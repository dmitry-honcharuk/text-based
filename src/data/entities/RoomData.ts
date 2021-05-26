import { RoomState, StatusDescription } from '../../domain/entities/RoomEntity';

export type RoomDataExit = {
  id: string;
  name: string;
  destinationRoomId: string;
};

export type RoomData = {
  id: string;
  customId: string;
  gameId: string;
  name: string;
  description: string;
  statusDescriptions?: StatusDescription[];
  exits: RoomDataExit[];
  state: RoomState;
  statuses: Set<string>;
};
