import Joi from 'joi';

export const attributeValidation = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
});
