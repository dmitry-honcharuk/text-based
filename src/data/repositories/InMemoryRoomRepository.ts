import {
  RoomExit,
  RoomRepository,
} from '../../domain/repositories/RoomRepository';
import { RoomEntity } from '../../domain/entities/RoomEntity';
import { RoomData } from '../entities/RoomData';
import { RoomEntityDataMapper } from '../mappers/RoomEntityDataMapper';
import { NoRoomError } from '../../domain/Errors/NoRoomError';

export class InMemoryRoomRepository implements RoomRepository {
  private _rooms: RoomData[] = [];

  constructor(private roomEntityDataMapper: RoomEntityDataMapper) {}

  async createRoom(room: RoomEntity) {
    this._rooms.push(this.roomEntityDataMapper.map(room));
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
