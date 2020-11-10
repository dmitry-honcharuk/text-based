import { CombatStartEffect } from '../Effects/CombatStartEffect';
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
    const EffectConstructor = EffectManager.getEffectConstructor(effectType);

    return new EffectConstructor(context, object, this.objectRepository);
  }

  static getEffectConstructor(effectType: EffectType) {
    if (effectType === EffectType.AttributeDecrease) {
      return DecreaseAttributeEffect;
    }

    if (effectType === EffectType.CombatStart) {
      return CombatStartEffect;
    }

    throw new UnknownEffectError(effectType);
  }
}
