import Joi from 'joi';
import { EffectType } from '../../../Effects/EffectType';

export const triggerValidation = Joi.object({
  command: Joi.string().required(),
  effects: Joi.object({
    [EffectType.AttributeDecrease]: Joi.object({
      attribute: Joi.string().required(),
      value: Joi.number(),
      attributeValue: Joi.string(),
    }).xor('value', 'attributeValue'),
  }).required(),
});
