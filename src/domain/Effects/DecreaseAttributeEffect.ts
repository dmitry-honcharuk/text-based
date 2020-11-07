import { AttributeDecreaseEffectContext } from '../entities/EffectTrigger';
import { ObjectEntity } from '../entities/ObjectEntity';
import { NoObjectAttributeError } from '../Errors/InvalidContextForEffectError';
import { InvalidObjectError } from '../Errors/InvalidObjectError';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { Effect, Options as EffectOpptions } from './Effect';

export class DecreaseAttributeEffect implements Effect {
  constructor(
    private context: AttributeDecreaseEffectContext,
    private object: ObjectEntity,
    private objectRepo: ObjectRepository,
  ) {}

  async execute(options: EffectOpptions): Promise<void> {
    const { issuerRoomId, possibleTargets } = options;

    const isTargetMatch = possibleTargets.some(
      (target) => this.object.id === target || this.object.name === target,
    );

    if (!isTargetMatch) {
      throw new InvalidObjectError(this.object.id);
    }

    const attributeValue =
      this.object.attributes?.get(this.context.attribute) ?? null;

    if (attributeValue === null) {
      throw new NoObjectAttributeError(this.object.id, this.context.attribute);
    }

    await this.objectRepo.updateObjectAttribute(issuerRoomId, this.object.id, {
      [this.context.attribute]: attributeValue - this.getDifference(),
    });
  }

  private getDifference(): number {
    if ('value' in this.context) {
      return this.context.value;
    }

    const value = this.object.attributes?.get(this.context.attributeValue);

    if (!value) {
      throw new NoObjectAttributeError(
        this.object.id,
        this.context.attributeValue,
      );
    }

    return value;
  }
}
