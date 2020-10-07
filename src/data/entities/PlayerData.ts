export type Config = {
  id: string;
  name: string;
  gameId: string;
};

export class PlayerData {
  public readonly id: string;
  public readonly name: string;
  public readonly gameId: string;

  constructor(config: Config) {
    this.id = config.id;
    this.name = config.name;
    this.gameId = config.gameId;
  }
}
