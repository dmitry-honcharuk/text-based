interface Config {
  id: string;
  name: string;
  description: string;
  gameId: string;
}

export class RoomEntity {
  private _id: string;
  private _name: string;
  private _description: string;
  private _gameId: string;

  constructor(config: Config) {
    this._id = config.id;
    this._name = config.name;
    this._description = config.description;
    this._gameId = config.gameId;
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

  get gameId(): string {
    return this._gameId;
  }
}
