import { random } from 'faker';
import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { NoRoomError } from '../../../domain/Errors/NoRoomError';
import { RoomData, RoomDataExit } from '../../entities/RoomData';
import { createRoomDataMock } from '../../entities/__tests__/utils/mocks';
import { createRoomEntityMapperMock } from '../../mappers/__tests__/utils/mocks';
import { InMemoryRoomRepository } from '../InMemoryRoomRepository';

describe('InMemoryRoomRepository', () => {
  it('should create a room', async () => {
    expect.assertions(2);

    const gameId = random.word();
    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityMapperMock(),
    );

    expect(roomRepository.rooms).toHaveLength(0);

    await roomRepository.createRoom(gameId, createRoomEntityMock());

    expect(roomRepository.rooms).toHaveLength(1);
  });

  it('should throw if there is no source room to link', async () => {
    expect.assertions(1);

    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityMapperMock(),
    );
    const id = random.word();

    await expect(
      roomRepository.linkRooms(id, {
        id: random.word(),
        name: random.word(),
        destinationRoomId: random.word(),
      }),
    ).rejects.toThrowError(new NoRoomError(id));
  });

  it('should throw if there is no destination room to link', async () => {
    expect.assertions(1);

    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityMapperMock({
        fromEntityToData: createRoomDataMock,
      }),
    );
    const gameId = random.word();
    const sourceId = random.word();
    const destinationRoomId = random.word();

    await roomRepository.createRoom(
      gameId,
      createRoomEntityMock({
        id: sourceId,
      }),
    );

    await expect(
      roomRepository.linkRooms(sourceId, {
        id: random.word(),
        name: random.word(),
        destinationRoomId,
      }),
    ).rejects.toThrowError(new NoRoomError(destinationRoomId));
  });

  it('should link two rooms', async () => {
    expect.assertions(2);

    const gameId = random.word();
    const sourceId = random.word();
    const destinationRoomId = random.word();

    const sourceRoomData = createRoomDataMock({
      id: sourceId,
    });

    const destinationRoomData = createRoomDataMock({
      id: destinationRoomId,
    });

    const sourceRoomEntity = createRoomEntityMock({
      id: sourceId,
    });

    const destinationRoomEntity = createRoomEntityMock({
      id: destinationRoomId,
    });

    const exitId = random.word();
    const exitName = random.word();
    const expectedExit: RoomDataExit = {
      id: exitId,
      name: exitName,
      destinationRoomId: destinationRoomId,
    };

    const fromEntityToData = (room: RoomData) => {
      if (room.id === destinationRoomId) {
        return destinationRoomData;
      }

      if (room.id === sourceId) {
        return sourceRoomData;
      }
    };

    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityMapperMock({
        fromEntityToData: fromEntityToData as () => any,
      }),
    );

    await roomRepository.createRoom(gameId, sourceRoomEntity);
    await roomRepository.createRoom(gameId, destinationRoomEntity);

    await expect(
      roomRepository.linkRooms(sourceId, {
        id: exitId,
        name: exitName,
        destinationRoomId,
      }),
    ).resolves.not.toThrowError();

    expect(sourceRoomData.exits).toEqual([expectedExit]);
  });
});
