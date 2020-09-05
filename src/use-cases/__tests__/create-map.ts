import { random } from 'faker';

import { makeCreateMap, MapConfig } from '../create-map';

describe('Create map', () => {
  it('should throw an error if there is no config for starting room', () => {
    const config: MapConfig = {
      startingRoom: 'lobby',
      rooms: [],
    };

    expect(() => {
      makeCreateMap()(config);
    }).toThrow();
  });

  it('should NOT an throw error if there is a config for starting room', () => {
    const id = random.uuid();

    const config: MapConfig = {
      startingRoom: id,
      rooms: [
        {
          id,
          name: random.word(),
          description: random.words(),
        },
      ],
    };

    expect(() => {
      makeCreateMap()(config);
    }).not.toThrow();
  });

  it('should throw an error if there is no config for exit room', () => {
    const id = random.uuid();

    const config: MapConfig = {
      startingRoom: id,
      rooms: [
        {
          id,
          name: random.word(),
          description: random.words(),
          exits: [
            {
              id: random.uuid(),
              name: random.word(),
              destination: random.uuid(),
            },
          ],
        },
      ],
    };

    expect(() => {
      makeCreateMap()(config);
    }).toThrow();
  });

  it('should NOT throw an error if there is a config for exit room', () => {
    const id = random.uuid();
    const exitRoomId = random.uuid();

    const config: MapConfig = {
      startingRoom: id,
      rooms: [
        {
          id,
          name: random.word(),
          description: random.words(),
          exits: [
            {
              id: random.uuid(),
              name: random.word(),
              destination: exitRoomId,
            },
          ],
        },
        {
          id: exitRoomId,
          name: random.word(),
          description: random.words(),
        },
      ],
    };

    expect(() => {
      makeCreateMap()(config);
    }).not.toThrow();
  });
});
