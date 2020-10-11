import { DeferredNullable } from '../utils/DeferredNullable';

export interface MapRepository {
  getGameStartingRoomId(gameId: string): DeferredNullable<string>;

  createMap(gameId: string, startingRoomId: string): Promise<string>;

  spawnPlayer(
    gameId: string,
    playerid: string,
    roomId: string,
  ): Promise<boolean>;
}
