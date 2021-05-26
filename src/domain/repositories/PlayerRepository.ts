import { EntityAttributes } from '../entities/EntityAttributes';
import { PlayerEntity } from '../entities/PlayerEntity';

export interface PlayerRepository {
  createPlayer(options: CreatePlayerDTO): Promise<string>;

  getGamePlayers(gameId: string): Promise<PlayerEntity[]>;

  appendPlayerStatuses(options: AppendStatusesDTO): Promise<void>;
}

export type CreatePlayerDTO = {
  gameId: string;
  playerName: string;
  attributes: EntityAttributes;
  statuses?: string[];
};

export type AppendStatusesDTO = {
  playerId: string;
  statuses: string[];
};
