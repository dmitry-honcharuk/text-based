import { AddStatusTrigger, StatusTarget } from '../entities/EffectTrigger';
import { DomainError } from '../Errors/DomainError';
import { PlayerRepository } from '../repositories/PlayerRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { Effect, Options as EffectOptions } from './Effect';

export class AddStatusEffect implements Effect {
  constructor(
    private context: AddStatusTrigger['options'],
    private roomRepo: RoomRepository,
    private playerRepo: PlayerRepository,
  ) {}

  async execute(options: EffectOptions): Promise<void> {
    if (this.context.target === StatusTarget.Room) {
      await this.addStatusesToRoom(options);
      return;
    }

    if (this.context.target === StatusTarget.Player) {
      await this.addStatusesToPlayer(options);
      return;
    }
  }

  private async addStatusesToRoom(options: EffectOptions) {
    const roomId = await this.roomRepo.getRoomIdByCustomId(
      options.gameId,
      this.context.targetId,
    );

    if (!roomId) {
      throw new DomainError('No room found');
    }

    const statuses = this.normalizeStatuses(this.context.status);

    await this.roomRepo.appendRoomStatuses(roomId, statuses);
  }

  private async addStatusesToPlayer(options: EffectOptions) {
    const statuses = this.normalizeStatuses(this.context.status);

    await this.playerRepo.appendPlayerStatuses({
      playerId: options.issuerId,
      statuses,
    });
  }

  private normalizeStatuses(status: string | string[]): string[] {
    return Array.isArray(status) ? status : [...new Set(status)];
  }
}
