import { RoomEntity, RoomState } from '../../domain/entities/RoomEntity';
import { NoRoomError } from '../../domain/Errors/NoRoomError';
import {
  RoomExit,
  RoomRepository,
} from '../../domain/repositories/RoomRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';
import { IdGenerator } from '../entities/IdGenerator';
import { RoomData } from '../entities/RoomData';
import { RoomEntityMapper } from '../mappers/RoomEntityMapper';

export class InMemoryRoomRepository implements RoomRepository {
  public readonly rooms: RoomData[] = [];

  constructor(
    private roomMapper: RoomEntityMapper,
    private idGenerator: IdGenerator,
  ) {}

  async createRoom(gameId: string, room: RoomEntity): Promise<string> {
    const id = this.idGenerator.next();

    const roomData = this.roomMapper.fromEntityToData(room, gameId);

    this.rooms.push({ id, ...roomData });

    return id;
  }

  async linkRooms(gameId: string, sourceCustomRoomId: string, exit: RoomExit) {
    const source = this.getRoomDataByCustomId(gameId, sourceCustomRoomId);

    if (!source) {
      throw new NoRoomError(sourceCustomRoomId);
    }

    const destination = this.getRoomDataByCustomId(
      gameId,
      exit.destinationRoomId,
    );

    if (!destination) {
      throw new NoRoomError(exit.destinationRoomId);
    }

    source.exits.push({
      id: exit.id,
      name: exit.name,
      destinationRoomId: destination.id,
    });
  }

  async getRoomById(roomId: string): DeferredNullable<RoomEntity> {
    const roomData = this.getRoomDataById(roomId);

    if (!roomData) {
      return null;
    }

    return this.roomMapper.fromDataToEntity(roomData);
  }

  async getRoomIdByCustomId(
    gameId: string,
    customRoomId: string,
  ): DeferredNullable<string> {
    const roomData = this.rooms.find(
      (room) => room.customId === customRoomId && room.gameId === gameId,
    );

    return roomData?.id ?? null;
  }

  async getGameRoomIds(gameId: string): Promise<string[]> {
    return this.rooms
      .filter(({ gameId: roomGameId }) => roomGameId === gameId)
      .map(({ id }) => id);
  }

  async updateState(roomId: string, state: RoomState): Promise<void> {
    const roomData = this.getRoomDataById(roomId);

    if (roomData) {
      roomData.state = state;
    }
  }

  async appendRoomStatuses(roomId: string, statuses: string[]): Promise<void> {
    const roomData = this.getRoomDataById(roomId);

    if (!roomData) {
      return;
    }

    roomData.statuses = [...(roomData.statuses ?? []), ...statuses];
  }

  private getRoomDataById(roomId: string): RoomData | null {
    const room = this.rooms.find(({ id }) => id === roomId);

    return room ?? null;
  }

  private getRoomDataByCustomId(
    gameId: string,
    roomCustomId: string,
  ): RoomData | null {
    const room = this.rooms.find(
      ({ gameId: roomGameId, customId }) =>
        customId === roomCustomId && roomGameId === gameId,
    );

    return room ?? null;
  }
}
