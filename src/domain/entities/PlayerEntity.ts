export type Config = {
  id: string;
  name: string;
};

export class PlayerEntity {
  public readonly id: string;
  public readonly name: string;

  constructor(config: Config) {
    this.id = config.id;
    this.name = config.name;
  }
}
