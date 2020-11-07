import { Condition, isAttributeValueReachCondition } from './Condition';
import { ObjectEntity } from './ObjectEntity';

export class ConditionChecker {
  isAnyConditionMet(conditions: Condition[], objects: ObjectEntity[]): boolean {
    return conditions.some((condition) =>
      this.isConditionMet(condition, objects),
    );
  }

  isConditionMet(condition: Condition, objects: ObjectEntity[]): boolean {
    if (isAttributeValueReachCondition(condition)) {
      const object = objects.find(({ id }) => id === condition.options.target);

      const attributeValue =
        object?.attributes?.get(condition.options.attribute) ?? null;

      if (attributeValue === null) {
        return false;
      }

      return attributeValue === condition.options.value;
    }

    return false;
  }
}
