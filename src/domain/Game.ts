import { Player } from './Player';
import { GameMap } from './GameMap';
import { BaseAction } from './actions/BaseAction';

type PendingActions = Map<BaseAction<unknown>, Player>;

export class Game {
  private _players: Set<Player> = new Set();
  private _pendingActions: PendingActions = new Map();
  private _isStarted = false;

  constructor(private _map: GameMap) {}

  addPlayer(player: Player) {
    this._players.add(player);
    this._map.spawnPlayer(player);
  }

  start(): boolean {
    if (this._players.size === 0 || this._isStarted) {
      return false;
    }

    this._isStarted = true;

    return true;
  }

  // @TODO Should return false if player is not in the game?
  registerAction(action: BaseAction<unknown>, issuer: Player) {
    this._pendingActions.set(action, issuer);
  }

  applyActions() {
    for (const [action, issuer] of this._pendingActions) {
      action.apply(this, issuer);
      this._pendingActions.delete(action);
    }
  }

  hasPlayer(name: string): boolean {
    return this.playerNames.includes(name);
  }

  get playerNames(): string[] {
    return [...this._players.values()].map(({ name }) => name);
  }

  get isStarted() {
    return this._isStarted;
  }

  get map() {
    return this._map;
  }
}
