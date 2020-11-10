import Joi, { SwitchCases } from 'joi';
import { EffectType } from '../../../Effects/EffectType';

const attributeDecreaseEffect = Joi.object({
  attribute: Joi.string().required(),
  value: Joi.number(),
  attributeValue: Joi.string(),
}).xor('value', 'attributeValue');

const combatEffects = [
  {
    is: EffectType.AttributeDecrease,
    then: attributeDecreaseEffect,
  },
];

const action = Joi.object({
  name: Joi.string().required(),
  effects: Joi.array().items(getEffect(combatEffects)).required(),
});

const combatStartEffect = Joi.object({
  actions: Joi.array().items(action).required(),
});

export const triggerValidation = Joi.object({
  command: Joi.string().required(),
  effects: Joi.array()
    .items(
      getEffect([
        ...combatEffects,
        {
          is: EffectType.CombatStart,
          then: combatStartEffect,
        },
      ]),
    )
    .required(),
});

function getEffect(effects: SwitchCases[]) {
  return Joi.object({
    type: Joi.string()
      .valid(...effects.map(({ is }) => is))
      .required(),
    options: Joi.alternatives().conditional('type', {
      switch: effects,
    }),
  });
}
