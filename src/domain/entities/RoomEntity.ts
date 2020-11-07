import { RoomConfig } from './game-config';

export type RoomEntityExit = {
  id: string;
  name: string;
  destinationRoomId: string;
};

export type RoomEntity = {
  id: string;
  name: string;
  description: string;
  exits: RoomEntityExit[];
};

export function getRoomFromConfig(roomConfig: RoomConfig): RoomEntity {
  return {
    ...roomConfig,
    exits:
      roomConfig.exits?.map((exitConfig) => ({
        ...exitConfig,
        destinationRoomId: exitConfig.roomId,
      })) ?? [],
  };
}
