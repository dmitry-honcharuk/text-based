interface RoomDataExit {
  id: string;
  name: string;
  destination: RoomData;
}

interface Config {
  id: string;
  name: string;
  description: string;
  gameId: string;
  exits?: RoomDataExit[];
}

export class RoomData {
  private readonly _id: string;
  private readonly _gameId: string;
  private readonly _name: string;
  private readonly _description: string;
  private _exits: RoomDataExit[] = [];

  constructor(config: Config) {
    this._id = config.id;
    this._name = config.name;
    this._description = config.description;
    this._gameId = config.gameId;
    this._exits = config.exits ?? [];
  }

  addExit(exit: RoomDataExit) {
    this._exits.push(exit);
  }

  get gameId(): string {
    return this._gameId;
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

  get exits(): RoomDataExit[] {
    return this._exits;
  }
}
