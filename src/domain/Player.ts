interface PlayerConfig {
  name: string;
}

export class Player {
  constructor(private config: PlayerConfig) {}

  get name(): string {
    return this.config.name;
  }
}
