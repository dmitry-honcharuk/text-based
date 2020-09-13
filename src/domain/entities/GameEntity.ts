interface Config {
  id: string;
}

export class GameEntity {
  constructor(private _id: string) {}

  static from(config: Config): GameEntity {
    return new GameEntity(config.id);
  }

  get id(): string {
    return this._id;
  }
}
