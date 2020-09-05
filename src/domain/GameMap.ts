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

  movePlayer(player: Player, direction: string): boolean {
    const playerRoom = this.playerLocations.get(player);

    if (!playerRoom) {
      return false;
    }

    const destination = playerRoom.getDestination(direction);

    if (!destination) {
      return false;
    }

    this.playerLocations.set(player, destination);

    return true;
  }

  getPlayerLocation(player: Player): Room | null {
    return this.playerLocations.get(player) ?? null;
  }

  get playersNumber(): number {
    return this.playerLocations.size;
  }
}
