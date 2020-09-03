interface DirectionConfig {
  id: string;
  name: string;
}

export class Direction {
  constructor(private config: DirectionConfig) {}

  isSameDirection(direction: Direction) {
    return this.id === direction.id;
  }

  get id(): string {
    return this.config.id;
  }

  get name(): string {
    return this.config.name;
  }
}
