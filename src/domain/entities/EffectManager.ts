import { Effect } from '../Effects/Effect';
import { EffectType } from '../Effects/EffectType';
import { PlayerPositionChangeEffect } from '../Effects/PlayerPositionChangeEffect';
import { UnknownEffectError } from '../Errors/UnknownEffectError';
import { MapRepository } from '../repositories/MapRepository';
import { RoomRepository } from '../repositories/RoomRepository';

export class EffectManager {
  constructor(
    private mapRepository: MapRepository,
    private roomRepository: RoomRepository,
  ) {}

  getEffect(effectType: EffectType): Effect {
    if (effectType === EffectType.PlayerLocationChange) {
      return new PlayerPositionChangeEffect(
        this.mapRepository,
        this.roomRepository,
      );
    }

    throw new UnknownEffectError(effectType);
  }
}
