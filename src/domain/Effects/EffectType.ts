export enum EffectType {
  PlayerLocationChange = 'playerLocationChange',
  AttributeDecrease = 'attributeDecrease',
}

export const effects: EffectType[] = Object.values(EffectType);
