import { AddStatusTrigger } from '../entities/EffectTrigger';
import { DomainError } from '../Errors/DomainError';
import { RoomRepository } from '../repositories/RoomRepository';
import { Effect, Options as EffectOptions } from './Effect';

// @TODO Implement dependency between description and statuses
//    @TODO incremental / conditional ?
//    @TODO description builder ?
export class AddStatusEffect implements Effect {
  constructor(
    private context: AddStatusTrigger['options'],
    private roomRepo: RoomRepository,
  ) {}

  async execute(options: EffectOptions): Promise<void> {
    const roomId = await this.roomRepo.getRoomIdByCustomId(
      options.gameId,
      this.context.targetId,
    );

    if (!roomId) {
      throw new DomainError('No room found');
    }

    await this.roomRepo.appendRoomStatuses(
      roomId,
      Array.isArray(this.context.status)
        ? this.context.status
        : [this.context.status],
    );
  }
}
