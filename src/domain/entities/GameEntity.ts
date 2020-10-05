export interface Config {
  id: string;
}

export class GameEntity {
  private readonly _id: string;
  private readonly _isStarted: boolean = false;

  constructor(config: Config) {
    this._id = config.id;
  }

  get id(): string {
    return this._id;
  }

  get isStarted(): boolean {
    return this._isStarted;
  }
}
