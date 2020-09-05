import { random } from 'faker';

import { makeCreateGame } from '../create-game';
import { makeCreateMap, MapConfig } from '../create-map';

describe('Create game', () => {
  it('should create game', () => {
    const mapConfig: MapConfig = {
      startingRoom: 'lobby',
      rooms: [],
    };

    const createMap = makeCreateMap();
    const createGame = makeCreateGame({ createMap });

    expect(() => {
      createGame({
        map: mapConfig,
      });
    }).toThrow();
  });

  it('should create game', () => {
    const id = random.uuid();

    const mapConfig: MapConfig = {
      startingRoom: id,
      rooms: [
        {
          id,
          name: random.word(),
          description: random.words(),
        },
      ],
    };

    const createMap = makeCreateMap();
    const createGame = makeCreateGame({ createMap });

    expect(() => {
      createGame({
        map: mapConfig,
      });
    }).not.toThrow();
  });
});
