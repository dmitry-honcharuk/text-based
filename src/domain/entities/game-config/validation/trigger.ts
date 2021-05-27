import Joi, { SwitchCases } from 'joi';
import { EffectType } from '../../../Effects/EffectType';
import { StatusTarget } from '../../EffectTrigger';

const attributeDecreaseEffect = Joi.object({
  attribute: Joi.string().required(),
  value: Joi.number(),
  attributeValue: Joi.string(),
}).xor('value', 'attributeValue');

const addStatusEffect = Joi.object({
  target: Joi.string()
    .valid(...Object.values(StatusTarget))
    .required(),
  targetId: Joi.string().required(),
  status: [Joi.string().required(), Joi.array().items(Joi.string()).required()],
});

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

const playerAction = Joi.object({
  command: Joi.string().required(),
  effects: Joi.array().items(getEffect(combatEffects)).required(),
});

const combatStartEffect = Joi.object({
  actions: Joi.array().items(action).required(),
  playerActions: Joi.array().items(playerAction).required(),
});

export const triggerValidation = Joi.object({
  command: Joi.string().required(),
  conditions: Joi.array()
    .items(
      Joi.object({
        requiredStatuses: Joi.array().items(Joi.string()),
        message: Joi.string(),
      }),
    )
    .optional(),
  effects: Joi.array()
    .items(
      getEffect([
        ...combatEffects,
        {
          is: EffectType.CombatStart,
          then: combatStartEffect,
        },
        {
          is: EffectType.AddStatus,
          then: addStatusEffect,
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
