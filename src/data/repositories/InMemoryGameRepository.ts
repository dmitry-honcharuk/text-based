import { GameRepository } from '../../domain/repositories/GameRepository';
import { GameEntity } from '../../domain/entities/GameEntity';
import { GameData } from '../entities/GameData';
import { GameDataEntityMapper } from '../mappers/GameDataEntityMapper';

export class InMemoryGameRepository implements GameRepository {
  private _games: GameData[] = [];

  constructor(private gameDataEntityMapper: GameDataEntityMapper) {}

  async createGame(): Promise<GameEntity> {
    const gameDataEntity = new GameData({ id: Date.now().toString() });

    this._games.push(gameDataEntity);

    return this.gameDataEntityMapper.map(gameDataEntity);
  }

  get games(): GameData[] {
    return this._games;
  }
}
