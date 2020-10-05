export interface Config {
  id: string;
}

export class GameData {
  private readonly _id: string;
  private _isStarted: boolean = false;

  constructor(config: Config) {
    this._id = config.id;
  }

  get id(): string {
    return this._id;
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  set isStarted(value: boolean) {
    this._isStarted = value;
  }
}
