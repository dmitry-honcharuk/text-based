import Joi from 'joi';
import { EffectType } from '../Effects/EffectType';

export interface GameConfig {
  startingRoom: string;
  rooms: RoomConfig[];
  playerAttributes?: AttributeConfig[];
}

export interface RoomConfig {
  id: string;
  name: string;
  description: string;
  exits?: RoomExitConfig[];
}

export interface RoomWithExitsConfig extends RoomConfig {
  exits: RoomExitConfig[];
}

export interface RoomExitConfig {
  id: string;
  name: string;
  roomId: string;
}

export interface TriggerConfig {
  command: string;
  effects: {
    [EffectType.AttributeDecrease]?: AttributeDecreaseEffectConfig;
  };
}

type AttributeDecreaseEffectConfig = {
  attribute: string;
} & ({ value: number } | { attributeValue: string });

export interface AttributeConfig {
  name: string;
  value: number;
}

const attributeValidation = Joi.object({
  name: Joi.string().required(),
  value: Joi.number().required(),
});

export const gameConfigValidationSchema = Joi.object({
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
      }).required(),
    )
    .required(),
});
