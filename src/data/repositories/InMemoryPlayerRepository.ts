import { EntityAttributes } from '../../domain/entities/EntityAttributes';
import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import { PlayerRepository } from '../../domain/repositories/PlayerRepository';
import { IdGenerator } from '../entities/IdGenerator';
import { PlayerData } from '../entities/PlayerData';
import { PlayerEntityMapper } from '../mappers/PlayerEntityMapper';

export class InMemoryPlayerRepository implements PlayerRepository {
  public readonly players: PlayerData[] = [];

  constructor(
    private idGenerator: IdGenerator,
    private playerMapper: PlayerEntityMapper,
  ) {}

  async createPlayer(
    gameId: string,
    playerName: string,
    attributes: EntityAttributes,
  ): Promise<string> {
    const playerId = this.idGenerator.next();

    const playerData: PlayerData = {
      id: playerId,
      name: playerName,
      gameId,
      attributes,
    };

    this.players.push(playerData);

    return playerId;
  }

  async getGamePlayers(gameId: string): Promise<PlayerEntity[]> {
    return this.players
      .filter((player) => player.gameId === gameId)
      .map((player) => this.playerMapper.fromDataToEntity(player));
  }
}
