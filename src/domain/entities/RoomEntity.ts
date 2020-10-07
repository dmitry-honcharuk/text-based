export interface Config {
  id: string;
  name: string;
  description: string;
}

export class RoomEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;

  constructor(config: Config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
  }
}
