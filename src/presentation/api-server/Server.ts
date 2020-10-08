import cors from 'cors';
import express, { Express, json } from 'express';
import { GameConfigValidator } from '../../domain/entities/GameConfigValidator';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { MapRepository } from '../../domain/repositories/MapRepository';
import { PlayerRepository } from '../../domain/repositories/PlayerRepository';
import { RoomRepository } from '../../domain/repositories/RoomRepository';
import { createRouter } from './router';

type ServerConfig = {
  port: number;
};

export class Server {
  private server: Express;

  constructor(
    private gameRepository: GameRepository,
    private roomRepository: RoomRepository,
    private gameConfigValidator: GameConfigValidator,
    private playerRepository: PlayerRepository,
    private mapRepository: MapRepository,
  ) {
    this.server = express();

    this.useMiddlewares();
    this.useRoutes();
  }

  public run(config: ServerConfig): void {
    this.server.listen(
      config.port,
      /* istanbul ignore next */
      () => {
        console.log(`Server listens on port: ${config.port}`);
      },
    );
  }

  private useMiddlewares() {
    this.server.use(cors());
    this.server.use(json());
  }

  private useRoutes() {
    this.server.use(
      createRouter({
        gameRepository: this.gameRepository,
        roomRepository: this.roomRepository,
        gameConfigValidator: this.gameConfigValidator,
        playerRepository: this.playerRepository,
        mapRepository: this.mapRepository,
      }),
    );
  }
}
