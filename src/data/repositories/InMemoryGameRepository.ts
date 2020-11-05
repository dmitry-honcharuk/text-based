import {
  AttributeConfig,
  EntityAttributes,
} from '../../domain/entities/EntityAttributes';
import { GameEntity } from '../../domain/entities/GameEntity';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { PlayerRepository } from '../../domain/repositories/PlayerRepository';
import { GameData } from '../entities/GameData';
import { IdGenerator } from '../entities/IdGenerator';
import { GameEntityMapper } from '../mappers/GameEntityMapper';

export class InMemoryGameRepository implements GameRepository {
  public readonly games: GameData[] = [];
  private readonly players: Set<string> = new Set();
  public readonly defaultPlayerAttributes: EntityAttributes = new Map();

  constructor(
    private gameEntityMapper: GameEntityMapper,
    private idGenerator: IdGenerator,
    private playerRepository: PlayerRepository,
  ) {}

  async createGame(): Promise<string> {
    const id = this.idGenerator.next();
    const gameDataEntity: GameData = { id, isStarted: false };

    this.games.push(gameDataEntity);

    return id;
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

    return this.gameEntityMapper.fromDataToEntity(
      gameData,
      players,
      this.defaultPlayerAttributes,
    );
  }

  async addPlayer(playerId: string): Promise<void> {
    this.players.add(playerId);
  }

  async hasPlayer(playerId: string): Promise<boolean> {
    return this.players.has(playerId);
  }

  async setDefaultPlayerAttributes(
    attributes: AttributeConfig[],
  ): Promise<void> {
    for (const attribute of attributes) {
      this.defaultPlayerAttributes.set(attribute.name, attribute.value);
    }
  }
}
