import Joi from 'joi';
import { EffectType } from '../Effects/EffectType';
import { ConditionType } from './Condition';
import { TriggerConfig } from './EffectTrigger';
import { AttributeConfig } from './EntityAttributes';
import { GameOptions } from './GameEntity';

export interface GameConfig {
  game: GameOptions;
  startingRoom: string;
  rooms: RoomConfig[];
  playerAttributes?: AttributeConfig[];
}

export interface RoomConfig {
  id: string;
  name: string;
  description: string;
  exits?: RoomExitConfig[];
  objects?: ObjectConfig[];
}

export interface RoomWithExitsConfig extends RoomConfig {
  exits: RoomExitConfig[];
}

export interface RoomExitConfig {
  id: string;
  name: string;
  roomId: string;
}

export interface ObjectConfig {
  id: string;
  name: string;
  attributes?: AttributeConfig[];
  triggers: TriggerConfig[];
}

const attributeValidation = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
});

const triggerValidation = Joi.object({
  command: Joi.string().required(),
  effects: Joi.object({
    [EffectType.AttributeDecrease]: Joi.object({
      attribute: Joi.string().required(),
      value: Joi.number(),
      attributeValue: Joi.string(),
    }).xor('value', 'attributeValue'),
  }).required(),
});

const objectValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  attributes: Joi.array().items(attributeValidation).optional(),
  triggers: Joi.array().items(triggerValidation).required(),
});

const attributeValueReachConditionValidation = Joi.object({
  target: Joi.string().required(),
  attribute: Joi.string().required(),
  value: Joi.number().required(),
}).required();

const conditionValidation = Joi.object({
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

export const gameConfigValidationSchema = Joi.object({
  game: Joi.object({
    winConditions: Joi.array().items(conditionValidation).required(),
    looseConditions: Joi.array().items(conditionValidation).required(),
  }).required(),
  startingRoom: Joi.string().required(),
  playerAttributes: Joi.array().items(attributeValidation).optional(),
  rooms: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        exits: Joi.array()
          .items(
            Joi.object({
              id: Joi.string().required(),
              name: Joi.string().required(),
              roomId: Joi.string().required(),
            }),
          )
          .optional(),
        objects: Joi.array().items(objectValidation).optional(),
      }).required(),
    )
    .required(),
});
