import Joi from 'joi';
import { attributeValidation } from './attribute';
import { triggerValidation } from './trigger';

export const objectValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  attributes: Joi.array().items(attributeValidation).optional(),
  triggers: Joi.array().items(triggerValidation).required(),
});
