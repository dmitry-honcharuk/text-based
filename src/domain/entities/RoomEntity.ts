import { RoomConfig } from './game-config';

export enum RoomState {
  Idle,
  Combat,
}

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
  state: RoomState;
};

export function getRoomFromConfig(roomConfig: RoomConfig): RoomEntity {
  return {
    ...roomConfig,
    state: RoomState.Idle,
    exits:
      roomConfig.exits?.map((exitConfig) => ({
        ...exitConfig,
        destinationRoomId: exitConfig.roomId,
      })) ?? [],
  };
}

export function isInCombatState(room: RoomEntity): boolean {
  return room.state === RoomState.Combat;
}
