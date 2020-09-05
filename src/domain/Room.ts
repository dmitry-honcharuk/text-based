import { Direction } from './Direction';

interface RoomConfig {
  id: string;
  name: string;
  description: string;
}

export class Room {
  private _exits: Map<Direction, Room> = new Map();
  private _exitKeys: Map<string, Direction> = new Map();

  constructor(private config: RoomConfig) {}

  link(room: Room, direction: Direction): boolean {
    if (this._exits.has(direction)) {
      return false;
    }

    this._exits.set(direction, room);
    this._exitKeys.set(direction.id, direction);

    return true;
  }

  hasExitInDirection(direction: Direction): boolean {
    return this.exits.some((exit) => exit.isSameDirection(direction));
  }

  getDestination(direction: string): Room | null {
    const exitKey = this._exitKeys.get(direction);

    if (!exitKey) {
      return null;
    }

    return this._exits.get(exitKey) ?? null;
  }

  get exits(): Direction[] {
    return [...this._exits.keys()];
  }
}
