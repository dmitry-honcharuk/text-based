import { EffectType } from '../Effects/EffectType';

export type EffectTrigger<T extends EffectType = any, C = any> = {
  type: T;
  options: C;
};

export type AttributeDecreaseEffectContext = {
  attribute: string;
} & ({ value: number } | { attributeValue: string });

export type AttributeDecreaseEffectTrigger = EffectTrigger<
  EffectType.AttributeDecrease,
  AttributeDecreaseEffectContext
>;

type CombatEffectsTriggers = AttributeDecreaseEffectTrigger;

type Action = {
  name: string;
  effects: CombatEffectsTriggers[];
};

export type CombatStartEffectContext = {
  actions: Action[];
};

export type CombatStartEffect = EffectTrigger<
  EffectType.CombatStart,
  CombatStartEffectContext
>;

export type EffectTriggerConfig = {
  command: string;
  effects: EffectTrigger[];
};

export enum StatusTarget {
  Room = 'room',
}

export type AddStatusTrigger = EffectTrigger<
  EffectType.AddStatus,
  {
    target: StatusTarget;
    targetId: string;
    status: string | string[];
  }
>;
