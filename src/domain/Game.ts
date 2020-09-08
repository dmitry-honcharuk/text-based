import { Player } from './Player';
import { GameMap } from './GameMap';

export class Game {
  private _players: Map<string, Player> = new Map();
  private _isStarted = false;

  constructor(private _map: GameMap) {}

  addPlayer(player: Player) {
    this._players.set(player.name, player);
    this._map.spawnPlayer(player);
  }

  start(): boolean {
    if (this._players.size === 0 || this._isStarted) {
      return false;
    }

    this._isStarted = true;

    return true;
  }

  hasPlayer(name: string): boolean {
    return this.playerNames.includes(name);
  }

  getPlayer(name: string): Player | null {
    return this._players.get(name) ?? null;
  }

  get playersNumber(): number {
    return this._players.size;
  }

  get playerNames(): string[] {
    return [...this._players.keys()];
  }

  get isStarted() {
    return this._isStarted;
  }

  get map() {
    return this._map;
  }
}
