import { Direction } from './Direction';

interface RoomConfig {
  id: string;
  name: string;
  description: string;
}

export class Room {
  private _exits: Map<Direction, Room> = new Map();

  constructor(private config: RoomConfig) {}

  link(room: Room, pathway: Direction): boolean {
    if (this._exits.has(pathway)) {
      return false;
    }

    this._exits.set(pathway, room);

    return true;
  }

  hasExitInDirection(direction: Direction): boolean {
    return this.exits.some((exit) => exit.isSameDirection(direction));
  }

  getDestination(direction: Direction): Room | null {
    return this._exits.get(direction) ?? null;
  }

  get exits(): Direction[] {
    return [...this._exits.keys()];
  }
}
