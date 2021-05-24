import Joi from 'joi';
import { ConditionType } from '../../Condition';

const attributeValueReachConditionValidation = Joi.object({
  target: Joi.string().required(),
  attribute: Joi.string().required(),
  value: Joi.number().required(),
}).required();

export const conditionValidation = Joi.object({
  condition: Joi.string().valid(...Object.values(ConditionType)),
  options: Joi.alternatives().conditional('condition', {
    switch: [
      {
        is: ConditionType.AttributeValueReach,
        then: attributeValueReachConditionValidation,
      },
    ],
  }),
});
