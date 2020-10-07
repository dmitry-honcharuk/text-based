export type Config = {
  name: string;
};

export class PlayerEntity {
  public readonly name: string;

  constructor(config: Config) {
    this.name = config.name;
  }
}
