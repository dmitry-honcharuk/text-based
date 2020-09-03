import { Player } from './Player';
import { GameMap } from './GameMap';
import { BaseAction } from './actions/BaseAction';

export class Game {
  private _players: Player[] = [];
  private _currentTurnActions: Set<BaseAction<unknown>> = new Set();
  private _isStarted = false;

  constructor(private _map: GameMap) {}

  addPlayer(player: Player) {
    this._players.push(player);
    this._map.spawnPlayer(player);
  }

  start(): boolean {
    if (this._players.length === 0 || this._isStarted) {
      return false;
    }

    this._isStarted = true;

    return true;
  }

  registerAction(action: BaseAction<unknown>) {
    this._currentTurnActions.add(action);
  }

  applyActions() {
    for (const action of this._currentTurnActions) {
      action.apply();
      this._currentTurnActions.delete(action);
    }
  }

  get playerNames(): string[] {
    return this._players.map(({ name }) => name);
  }

  get isStarted() {
    return this._isStarted;
  }

  get map() {
    return this._map;
  }
}
