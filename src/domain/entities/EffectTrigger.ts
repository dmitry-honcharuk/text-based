import { EffectType } from '../Effects/EffectType';

export type EffectTrigger<T extends EffectType = any, C = any> = {
  type: T;
  context: C;
};

export type AttributeDecreaseEffectContext = {
  attribute: string;
} & ({ value: number } | { attributeValue: string });

type TriggerEffectConfig = {
  [EffectType.AttributeDecrease]?: AttributeDecreaseEffectContext;
};

export type TriggerConfig = {
  command: string;
  effects: TriggerEffectConfig;
};

export function createEffectTriggers(
  effects: TriggerEffectConfig,
): EffectTrigger[] {
  const triggers: EffectTrigger[] = [];

  for (const [type, context] of Object.entries(effects)) {
    if (type === EffectType.AttributeDecrease) {
      triggers.push({
        type,
        context,
      });
    }
  }

  return triggers;
}
