import { AddStatusEffect } from '../Effects/AddStatusEffect';
import { CombatStartEffect } from '../Effects/CombatStartEffect';
import { DecreaseAttributeEffect } from '../Effects/DecreaseAttributeEffect';
import { Effect } from '../Effects/Effect';
import { EffectType } from '../Effects/EffectType';
import { PlayerPositionChangeEffect } from '../Effects/PlayerPositionChangeEffect';
import { UnknownEffectError } from '../Errors/UnknownEffectError';
import { CombatRepository } from '../repositories/CombatRepository';
import { MapRepository } from '../repositories/MapRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { PlayerRepository } from '../repositories/PlayerRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { ObjectEntity } from './ObjectEntity';

export class EffectManager {
  constructor(
    private mapRepository: MapRepository,
    private roomRepository: RoomRepository,
    private objectRepository: ObjectRepository,
    private combatRepository: CombatRepository,
    private playerRepository: PlayerRepository,
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

    if (effectType === EffectType.AddStatus) {
      return new AddStatusEffect(
        context,
        this.roomRepository,
        this.playerRepository,
      );
    }

    if (effectType === EffectType.CombatStart) {
      return new CombatStartEffect(
        context,
        object,
        this.objectRepository,
        this.roomRepository,
        this.combatRepository,
      );
    }

    throw new UnknownEffectError(effectType);
  }
}
