import { RoomEntity } from '../entities/RoomEntity';

export interface RoomExit {
  id: string;
  name: string;
  destinationRoomId: string;
}

export interface RoomRepository {
  createRoom(gameId: string, room: RoomEntity): Promise<void>;

  linkRooms(sourceId: string, exit: RoomExit): Promise<void>;
}
