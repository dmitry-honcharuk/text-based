import { PlayerEntity } from './PlayerEntity';

export interface Config {
  isStarted?: boolean;
  players?: PlayerEntity[];
}

export class GameEntity {
  public readonly isStarted: boolean = false;
  public readonly players: PlayerEntity[];

  constructor(config: Config) {
    this.isStarted = config.isStarted ?? false;
    this.players = config.players ?? [];
  }
}
