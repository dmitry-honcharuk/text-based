import { CombatStartEffectContext } from '../entities/EffectTrigger';
import { ObjectEntity } from '../entities/ObjectEntity';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { Effect, Options as EffectOptions } from './Effect';

// @TODO Combat repository?
// @TODO Combat manager
export class CombatStartEffect implements Effect {
  constructor(
    private context: CombatStartEffectContext,
    private object: ObjectEntity,
    private objectRepo: ObjectRepository,
  ) {}

  async execute(options: EffectOptions): Promise<void> {
    console.log('COMBAT START IN', options.playerRoom.name);
  }
}
