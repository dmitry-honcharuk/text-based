import { random } from 'faker';
import { NPC } from '../../domain/NPC';
import { makeCreateMap, MapConfig } from '../create-map';

jest.mock('../../domain/NPC')

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

  it('should NOT throw an error if there is a config for NPCs', () => {
    const id = random.uuid();
    const exitRoomId = random.uuid();

    const npc1 = {
      id: random.word(),
      name: random.word(),
      health: random.number(),
    };
    const npc2 = {
      id: random.word(),
      name: random.word(),
    };
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
          npc: [npc1, npc2],
        },
      ],
    };

    expect(() => {
      makeCreateMap()(config);
    }).not.toThrow();

    expect(NPC).toHaveBeenCalledTimes(2);
    expect(NPC).toHaveBeenNthCalledWith(1, npc1);
    expect(NPC).toHaveBeenNthCalledWith(2, npc2);
  })
});
