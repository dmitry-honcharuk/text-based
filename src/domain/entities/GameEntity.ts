export interface Config {
  id: string;
  isStarted?: boolean;
}

export class GameEntity {
  private readonly _id: string;
  private readonly _isStarted: boolean = false;

  constructor(config: Config) {
    this._id = config.id;
    this._isStarted = config.isStarted ?? false;
  }

  get id(): string {
    return this._id;
  }

  get isStarted(): boolean {
    return this._isStarted;
  }
}
