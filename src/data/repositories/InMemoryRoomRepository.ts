import { RoomEntity } from '../../domain/entities/RoomEntity';
import { NoRoomError } from '../../domain/Errors/NoRoomError';
import {
  RoomExit,
  RoomRepository,
} from '../../domain/repositories/RoomRepository';
import { RoomData } from '../entities/RoomData';
import { RoomEntityMapper } from '../mappers/RoomEntityMapper';

export class InMemoryRoomRepository implements RoomRepository {
  private _rooms: RoomData[] = [];

  constructor(private roomMapper: RoomEntityMapper) {}

  async createRoom(gameId: string, room: RoomEntity) {
    this._rooms.push(this.roomMapper.fromEntityToData(room, gameId));
  }

  async linkRooms(sourceId: string, exit: RoomExit) {
    const source = this.getRoomDataById(sourceId);

    if (!source) {
      throw new NoRoomError(sourceId);
    }

    const destination = this.getRoomDataById(exit.destinationRoomId);

    if (!destination) {
      throw new NoRoomError(exit.destinationRoomId);
    }

    source.exits.push({
      id: exit.id,
      name: exit.name,
      destinationRoomId: destination.id,
    });
  }

  private getRoomDataById(roomId: string): RoomData | null {
    const room = this._rooms.find(({ id }) => id === roomId);

    return room ?? null;
  }

  get rooms(): RoomData[] {
    return this._rooms;
  }
}
