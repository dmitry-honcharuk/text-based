import { Room } from './Room';
import { Player } from './Player';
import { Direction } from './Direction';

export class GameMap {
  private playerLocations: Map<Player, Room> = new Map();

  constructor(private startingRoom: Room) {}

  spawnPlayer(player: Player) {
    this.playerLocations.set(player, this.startingRoom);
  }

  getPlayerPossibleDirections(player: Player): null | Direction[] {
    const playerRoom = this.playerLocations.get(player);

    if (!playerRoom) {
      return null;
    }

    return playerRoom.exits;
  }

  getPlayerLocation(player: Player): Room | null {
    return this.playerLocations.get(player) ?? null;
  }

  setPLayerLocation(player: Player, destination: Room): void {
    this.playerLocations.set(player, destination);
  }

  get playersNumber(): number {
    return this.playerLocations.size;
  }
}
