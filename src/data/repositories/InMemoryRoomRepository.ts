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

  async createRoom(room: RoomEntity) {
    this._rooms.push(this.roomMapper.fromEntityToData(room));
  }

  async linkRooms(sourceId: string, exit: RoomExit) {
    const source = await this.getRoomDataById(sourceId);

    if (!source) {
      throw new NoRoomError(sourceId);
    }

    const destination = await this.getRoomDataById(exit.destinationId);

    if (!destination) {
      throw new NoRoomError(exit.destinationId);
    }

    source.addExit({ id: exit.id, name: exit.name, destination });
  }

  private async getRoomDataById(roomId: string): Promise<RoomData | null> {
    const room = this._rooms.find(({ id }) => id === roomId);

    return room ?? null;
  }

  get rooms(): RoomData[] {
    return this._rooms;
  }
}
