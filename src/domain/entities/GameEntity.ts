import { PlayerEntity } from './PlayerEntity';

export interface Config {
  id: string;
  isStarted?: boolean;
  players?: PlayerEntity[];
}

export class GameEntity {
  public readonly id: string;
  public readonly isStarted: boolean = false;
  public readonly players: PlayerEntity[];

  constructor(config: Config) {
    this.id = config.id;
    this.isStarted = config.isStarted ?? false;
    this.players = config.players ?? [];
  }
}
