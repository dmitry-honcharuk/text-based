import { random } from 'faker';
import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { NoRoomError } from '../../../domain/Errors/NoRoomError';
import { RoomData } from '../../entities/RoomData';
import { createRoomDataMock } from '../../entities/__tests__/utils/mocks';
import { createRoomEntityMapperMock } from '../../mappers/__tests__/utils/mocks';
import { InMemoryRoomRepository } from '../InMemoryRoomRepository';

describe('InMemoryRoomRepository', () => {
  it('should create a room', async () => {
    expect.assertions(2);

    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityMapperMock(),
    );

    expect(roomRepository.rooms).toHaveLength(0);

    await roomRepository.createRoom(createRoomEntityMock());

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
        destinationId: random.word(),
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
    const sourceId = random.word();
    const destinationId = random.word();

    await roomRepository.createRoom(
      createRoomEntityMock({
        id: sourceId,
      }),
    );

    await expect(
      roomRepository.linkRooms(sourceId, {
        id: random.word(),
        name: random.word(),
        destinationId,
      }),
    ).rejects.toThrowError(new NoRoomError(destinationId));
  });

  it('should link two rooms', async () => {
    expect.assertions(3);

    const sourceId = random.word();
    const destinationId = random.word();

    const sourceRoomData = createRoomDataMock({
      id: sourceId,
    });

    const destinationRoomData = createRoomDataMock({
      id: destinationId,
    });

    const sourceRoomEntity = createRoomEntityMock({
      id: sourceId,
    });

    const destinationRoomEntity = createRoomEntityMock({
      id: destinationId,
    });

    const fromEntityToData = (room: RoomData) => {
      if (room.id === destinationId) {
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

    await roomRepository.createRoom(sourceRoomEntity);
    await roomRepository.createRoom(destinationRoomEntity);

    const exitId = random.word();
    const exitName = random.word();

    await expect(
      roomRepository.linkRooms(sourceId, {
        id: exitId,
        name: exitName,
        destinationId,
      }),
    ).resolves.not.toThrowError();

    expect(sourceRoomData.addExit).toHaveBeenCalled();
    expect(sourceRoomData.addExit).toHaveBeenCalledWith({
      id: exitId,
      name: exitName,
      destination: destinationRoomData,
    });
  });
});
