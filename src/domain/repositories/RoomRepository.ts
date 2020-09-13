import { RoomEntity } from '../entities/RoomEntity';

export interface RoomExit {
  id: string;
  name: string;
  destinationId: string;
}

export interface RoomRepository {
  createRoom(room: RoomEntity): Promise<void>;

  linkRooms(sourceId: string, exit: RoomExit): Promise<void>;
}
