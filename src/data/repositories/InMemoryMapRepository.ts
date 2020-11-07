import {
  GetPlayerRoomResponseDto,
  MapRepository,
} from '../../domain/repositories/MapRepository';
import { RoomRepository } from '../../domain/repositories/RoomRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';
import { IdGenerator } from '../entities/IdGenerator';
import { MapData } from '../entities/MapData';

export class InMemoryMapRepository implements MapRepository {
  public readonly maps: MapData[] = [];

  constructor(
    private idGenerator: IdGenerator,
    private roomRepo: RoomRepository,
  ) {}

  async getGameStartingRoomId(gameId: string): DeferredNullable<string> {
    const mapData = this.getMapDataByGameId(gameId);

    if (!mapData) {
      return null;
    }

    return mapData.startingRoomId;
  }

  async createMap(
    gameId: string,
    startingCustomRoomId: string,
  ): Promise<string> {
    const id = this.idGenerator.next();

    this.maps.push({
      gameId,
      startingRoomId: startingCustomRoomId,
      playerLocations: new Map(),
    });

    return id;
  }

  async spawnPlayer(
    gameId: string,
    playerId: string,
    roomId: string,
  ): Promise<boolean> {
    const mapData = this.getMapDataByGameId(gameId);

    if (!mapData) {
      return false;
    }

    mapData.playerLocations.set(playerId, roomId);

    return true;
  }

  async getPlayerRoom(
    gameId: string,
    playerId: string,
  ): DeferredNullable<GetPlayerRoomResponseDto> {
    const playerMap = this.getMapDataByGameId(gameId);

    if (!playerMap) {
      return null;
    }

    const locationId = playerMap.playerLocations.get(playerId);

    if (!locationId) {
      return null;
    }

    const location = await this.roomRepo.getRoomById(locationId);

    if (!location) {
      return null;
    }

    return [locationId, location];
  }

  async setPlayerLocation(
    gameId: string,
    playerId: string,
    roomId: string,
  ): Promise<void> {
    const playerMap = this.getMapDataByGameId(gameId);

    playerMap?.playerLocations.set(playerId, roomId);
  }

  private getMapDataByGameId(id: string): MapData | null {
    return this.maps.find(({ gameId }) => gameId === id) ?? null;
  }
}
