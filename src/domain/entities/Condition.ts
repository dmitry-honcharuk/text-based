export enum ConditionType {
  AttributeValueReach = 'attributeValueReach',
}

export interface Condition<C extends ConditionType = any, O = any> {
  condition: C;
  options: O;
}

export type AttributeValueReachCondition = Condition<
  ConditionType.AttributeValueReach,
  {
    target: string;
    attribute: string;
    value: number;
  }
>;

export function getRelevantObjectIds(conditions: Condition[]): string[] {
  const objectIds = conditions
    .filter(isAttributeValueReachCondition)
    .map((condition) => condition.options.target);

  return [...new Set(objectIds)];
}

export function isAttributeValueReachCondition(
  condition: Condition,
): condition is AttributeValueReachCondition {
  return condition.condition === ConditionType.AttributeValueReach;
}
