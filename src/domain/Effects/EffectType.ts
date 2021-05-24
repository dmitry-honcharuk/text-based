export enum EffectType {
  PlayerLocationChange = 'playerLocationChange',
  AttributeDecrease = 'attributeDecrease',
  CombatStart = 'combatStart',
}

export const effects: EffectType[] = Object.values(EffectType);
