export interface Config {
  id: string;
}

export class GameData {
  private readonly _id: string;

  constructor(config: Config) {
    this._id = config.id;
  }

  get id(): string {
    return this._id;
  }
}
