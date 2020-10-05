import { GameEntity } from '../../domain/entities/GameEntity';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { GameData } from '../entities/GameData';
import { IdGenerator } from '../entities/IdGenerator';
import { GameDataEntityMapper } from '../mappers/GameDataEntityMapper';

export class InMemoryGameRepository implements GameRepository {
  private _games: GameData[] = [];

  constructor(
    private gameDataEntityMapper: GameDataEntityMapper,
    private idGenerator: IdGenerator,
  ) {}

  async createGame(): Promise<GameEntity> {
    const gameDataEntity = new GameData({ id: this.idGenerator.next() });

    this._games.push(gameDataEntity);

    return this.gameDataEntityMapper.map(gameDataEntity);
  }

  async startGame(gameId: string): Promise<void> {
    const game = this.games.find(({ id }) => id === gameId);

    if (game) {
      game.isStarted = true;
    }
  }

  async getGameById(gameId: string): Promise<GameEntity | null> {
    const gameData = this.games.find(({ id }) => id === gameId);

    return gameData ? this.gameDataEntityMapper.map(gameData) : null;
  }

  get games(): GameData[] {
    return this._games;
  }
}
