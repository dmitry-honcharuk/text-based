import { PlayerEntity } from '../../domain/entities/PlayerEntity';
import {
  AppendStatusesDTO,
  CreatePlayerDTO,
  PlayerRepository,
} from '../../domain/repositories/PlayerRepository';
import { IdGenerator } from '../entities/IdGenerator';
import { PlayerData } from '../entities/PlayerData';
import { PlayerEntityMapper } from '../mappers/PlayerEntityMapper';

export class InMemoryPlayerRepository implements PlayerRepository {
  public readonly players: PlayerData[] = [];

  constructor(
    private idGenerator: IdGenerator,
    private playerMapper: PlayerEntityMapper,
  ) {}

  async createPlayer({
    gameId,
    playerName,
    attributes,
    statuses = [],
  }: CreatePlayerDTO): Promise<string> {
    const playerId = this.idGenerator.next();

    const playerData: PlayerData = {
      id: playerId,
      name: playerName,
      gameId,
      attributes,
      statuses,
    };

    this.players.push(playerData);

    return playerId;
  }

  async getGamePlayers(gameId: string): Promise<PlayerEntity[]> {
    return this.players
      .filter((player) => player.gameId === gameId)
      .map((player) => this.playerMapper.fromDataToEntity(player));
  }

  async appendPlayerStatuses({
    playerId,
    statuses,
  }: AppendStatusesDTO): Promise<void> {
    const player = this.players.find(({ id }) => id === playerId);

    if (!player) {
      return;
    }

    player.statuses = [...(player.statuses ?? []), ...statuses];
  }
}
