import { random } from 'faker';
import { GameConfig, gameConfigValidationSchema } from '../game-config';
import { GameConfigValidator } from '../GameConfigValidator';
import { createGameOptionsMock } from './utils/mocks';

describe('GameConfigValidator', () => {
  let validator: GameConfigValidator;

  beforeEach(() => {
    validator = new GameConfigValidator(gameConfigValidationSchema);
  });

  it('should throw if there is no starting room id', () => {
    const config = {} as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no rooms config', () => {
    const config = {
      startingRoom: random.word(),
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no starting room config', () => {
    const config = {
      startingRoom: 'room1',
      rooms: [
        {
          id: 'room2',
          name: random.word(),
          description: random.word(),
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no room id', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          name: random.word(),
          description: random.word(),
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no room name', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          description: random.word(),
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no room description', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.words(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          name: random.word(),
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no exit room config', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          name: random.word(),
          description: random.words(),
          exits: [
            {
              id: random.word(),
              name: random.word(),
              roomId: random.word(),
            },
          ],
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no exit id', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          name: random.word(),
          description: random.words(),
          exits: [
            {
              name: random.word(),
              roomId: random.word(),
            },
          ],
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no exit name', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          name: random.word(),
          description: random.words(),
          exits: [
            {
              id: random.word(),
              roomId: random.word(),
            },
          ],
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no exit playerRoomId', () => {
    const startingRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [
        startingRoom,
        {
          id: random.word(),
          name: random.word(),
          description: random.words(),
          exits: [
            {
              id: random.word(),
              name: random.word(),
            },
          ],
        },
      ],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should throw if there is no game config', () => {
    const startingRoomId = random.word();
    const secondRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
      exits: [
        {
          id: random.word(),
          name: random.word(),
          roomId: secondRoomId,
        },
      ],
    };
    const secondRoom = {
      id: secondRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config = {
      startingRoom: startingRoomId,
      rooms: [startingRoom, secondRoom],
    } as GameConfig;

    expect(() => {
      validator.validate(config);
    }).toThrowError();
  });

  it('should NOT throw', () => {
    const startingRoomId = random.word();
    const secondRoomId = random.word();

    const startingRoom = {
      id: startingRoomId,
      name: random.word(),
      description: random.word(),
      exits: [
        {
          id: random.word(),
          name: random.word(),
          roomId: secondRoomId,
        },
      ],
    };
    const secondRoom = {
      id: secondRoomId,
      name: random.word(),
      description: random.word(),
    };

    const config: GameConfig = {
      game: createGameOptionsMock(),
      startingRoom: startingRoomId,
      rooms: [startingRoom, secondRoom],
    };

    expect(() => {
      validator.validate(config);
    }).not.toThrowError();
  });
});
