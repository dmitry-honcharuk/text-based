import { MapRepository } from '../../domain/repositories/MapRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';
import { IdGenerator } from '../entities/IdGenerator';
import { MapData } from '../entities/MapData';

export class InMemoryMapRepository implements MapRepository {
  public readonly maps: MapData[] = [];

  constructor(private idGenerator: IdGenerator) {}

  async getGameStartingRoomId(gameId: string): DeferredNullable<string> {
    const mapData = this.getMapDataByGameId(gameId);

    if (!mapData) {
      return null;
    }

    return mapData.startingRoomId;
  }

  async createMap(gameId: string, startingRoomId: string): Promise<string> {
    const id = this.idGenerator.next();

    this.maps.push({
      gameId,
      startingRoomId,
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

  private getMapDataByGameId(id: string): MapData | null {
    return this.maps.find(({ gameId }) => gameId === id) ?? null;
  }
}
