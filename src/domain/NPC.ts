export interface NPCConfig {
  id: string;
  name: string;
}

export class NPC {
  private readonly _id: string;
  private readonly _name: string;

  constructor(config: NPCConfig) {
    this._id = config.id;
    this._name = config.name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
