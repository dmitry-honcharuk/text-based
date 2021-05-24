import Joi from 'joi';
import { attributeValidation } from './attribute';
import { conditionValidation } from './condition';
import { objectValidation } from './object';

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
