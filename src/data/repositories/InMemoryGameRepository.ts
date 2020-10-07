import { GameEntity } from '../../domain/entities/GameEntity';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { PlayerRepository } from '../../domain/repositories/PlayerRepository';
import { GameData } from '../entities/GameData';
import { IdGenerator } from '../entities/IdGenerator';
import { GameDataEntityMapper } from '../mappers/GameDataEntityMapper';

export class InMemoryGameRepository implements GameRepository {
  public readonly games: GameData[] = [];

  constructor(
    private gameDataEntityMapper: GameDataEntityMapper,
    private idGenerator: IdGenerator,
    private playerRepository: PlayerRepository,
  ) {}

  async createGame(): Promise<GameEntity> {
    const gameDataEntity = new GameData({ id: this.idGenerator.next() });

    this.games.push(gameDataEntity);

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

    if (!gameData) {
      return null;
    }

    const players = await this.playerRepository.getGamePlayers(gameId);

    return this.gameDataEntityMapper.map(gameData, players);
  }
}
