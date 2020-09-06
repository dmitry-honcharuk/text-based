import { Direction } from './Direction';
import { NPC } from './NPC';
import { Attackable } from './combat/Attackable';

interface RoomConfig {
  id: string;
  name: string;
  description: string;
}

export class Room {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private _exits: Map<Direction, Room> = new Map();
  private _exitKeys: Map<string, Direction> = new Map();
  private _npc: Set<NPC> = new Set();
  private _attackables: Map<string, Attackable> = new Map();

  constructor(config: RoomConfig) {
    this._id = config.id;
    this._name = config.name;
    this._description = config.description;
  }

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

  addNpc(npc: NPC) {
    this._npc.add(npc);
    this.addAttackable(npc.id, npc)
  }

  addAttackable(id:string, attackable: Attackable) {
    this._attackables.set(id, attackable);
  }

  getAttackable(id: string): Attackable | null {
    return this._attackables.get(id) ?? null;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get exits(): Direction[] {
    return [...this._exits.keys()];
  }

  get npc(): Set<NPC> {
    return this._npc;
  }
}
