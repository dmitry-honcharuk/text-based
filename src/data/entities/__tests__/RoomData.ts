import { random } from 'faker';
import { RoomData, Config } from '../RoomData';

import { createRoomDataMock } from './utils/mocks';

describe('RoomData entity', () => {
  let roomData: RoomData, roomDataConfig: Config;

  beforeEach(() => {
    roomDataConfig = {
      id: random.word(),
      name: random.word(),
      description: random.words(),
      gameId: random.word(),
    };

    roomData = new RoomData(roomDataConfig);
  });

  it('should properly initiate entity', () => {
    expect(roomData.id).toBe(roomDataConfig.id);
    expect(roomData.name).toBe(roomDataConfig.name);
    expect(roomData.description).toBe(roomDataConfig.description);
    expect(roomData.gameId).toBe(roomDataConfig.gameId);
  });

  it('should properly initiate entity with exits', () => {
    const exit1 = {
      id: random.word(),
      name: random.word(),
      destination: createRoomDataMock(),
    };
    const exit2 = {
      id: random.word(),
      name: random.word(),
      destination: createRoomDataMock(),
    };

    const roomData = new RoomData({
      ...roomDataConfig,
      exits: [exit1, exit2],
    });

    expect(roomData.exits).toEqual(expect.arrayContaining([exit1, exit2]));
  });

  it('should properly add an exit', () => {
    const newExit = {
      id: random.word(),
      name: random.word(),
      destination: createRoomDataMock(),
    };

    roomData.addExit(newExit);

    expect(roomData.exits).toEqual(expect.arrayContaining([newExit]));
  });
});
