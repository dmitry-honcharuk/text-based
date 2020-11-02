import Joi from 'joi';

export interface GameConfig {
  startingRoom: string;
  rooms: RoomConfig[];
  playerAttributes?: ConfigAttribute[];
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

export interface ConfigAttribute {
  name: string;
  value: number;
}

const attributesValidation = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
  }),
);

export const gameConfigValidationSchema = Joi.object({
  startingRoom: Joi.string().required(),
  playerAttributes: attributesValidation.optional(),
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
