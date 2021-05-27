import { RoomEntity, RoomState } from '../entities/RoomEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface RoomExit {
  id: string;
  name: string;
  destinationRoomId: string;
}

export interface RoomRepository {
  createRoom(gameId: string, room: RoomEntity): Promise<string>;

  linkRooms(gameId: string, sourceId: string, exit: RoomExit): Promise<void>;

  getRoomById(roomId: string): DeferredNullable<RoomEntity>;

  getRoomIdByCustomId(
    gameId: string,
    customRoomId: string,
  ): DeferredNullable<string>;

  getGameRoomIds(gameId: string): Promise<string[]>;

  updateState(roomId: string, state: RoomState): Promise<void>;

  appendRoomStatuses(roomId: string, statuses: string[]): Promise<void>;

  getRoomStatuses(roomId: string): Promise<string[]>;
}
