import * as Joi from 'joi';

import { WrongGameConfigError } from '../Errors/WrongGameConfigError';
import { GameConfig, RoomWithExitsConfig } from './game-config';

export class GameConfigValidator {
  constructor(private schema: Joi.Schema) {}

  validate(config: GameConfig) {
    GameConfigValidator.validateRoomExistence(config);

    const { error } = this.schema.validate(config);

    if (error) {
      throw new WrongGameConfigError(error.message);
    }
  }

  private static validateRoomExistence(config: GameConfig) {
    const { rooms: roomConfigs, startingRoom } = config;
    const roomIds = roomConfigs.map(({ id }) => id);

    if (!roomIds.includes(startingRoom)) {
      throw new WrongGameConfigError(
        `There is no starting room configuration. ${startingRoom}`,
      );
    }

    const roomsWithExits = roomConfigs.filter(
      ({ exits }) => !!exits,
    ) as RoomWithExitsConfig[];

    const allExitIds = roomsWithExits
      .flatMap(({ exits }) => exits)
      .map(({ roomId }) => roomId);

    for (const exitId of allExitIds) {
      if (!roomIds.includes(exitId)) {
        throw new WrongGameConfigError(
          `No exit room configuration (${exitId})`,
        );
      }
    }
  }
}
