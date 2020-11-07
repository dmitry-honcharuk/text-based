import { DecreaseAttributeEffect } from '../Effects/DecreaseAttributeEffect';
import { Effect } from '../Effects/Effect';
import { EffectType } from '../Effects/EffectType';
import { PlayerPositionChangeEffect } from '../Effects/PlayerPositionChangeEffect';
import { UnknownEffectError } from '../Errors/UnknownEffectError';
import { MapRepository } from '../repositories/MapRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { ObjectEntity } from './ObjectEntity';

export class EffectManager {
  constructor(
    private mapRepository: MapRepository,
    private roomRepository: RoomRepository,
    private objectRepository: ObjectRepository,
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

  getObjectEffect(
    effectType: EffectType,
    object: ObjectEntity,
    context: any,
  ): Effect {
    if (effectType === EffectType.AttributeDecrease) {
      return new DecreaseAttributeEffect(
        context,
        object,
        this.objectRepository,
      );
    }

    throw new UnknownEffectError(effectType);
  }
}
