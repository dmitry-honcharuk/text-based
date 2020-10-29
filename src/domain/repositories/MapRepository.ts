import { RoomEntity } from '../entities/RoomEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface MapRepository {
  getGameStartingRoomId(gameId: string): DeferredNullable<string>;

  createMap(gameId: string, startingRoomId: string): Promise<string>;

  spawnPlayer(
    gameId: string,
    playerid: string,
    roomId: string,
  ): Promise<boolean>;

  getPlayerRoom(gameId: string, playerId: string): DeferredNullable<RoomEntity>;

  setPlayerLocation(
    gameId: string,
    playerId: string,
    roomId: string,
  ): Promise<void>;
}
