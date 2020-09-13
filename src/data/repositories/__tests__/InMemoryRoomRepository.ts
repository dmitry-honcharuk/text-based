import { random } from 'faker';
import { InMemoryRoomRepository } from '../InMemoryRoomRepository';
import { RoomData } from '../../entities/RoomData';
import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { createRoomEntityDataMapperMock } from '../../mappers/__tests__/utils/mocks';
import { NoRoomError } from '../../../domain/Errors/NoRoomError';
import { RoomEntityDataMapper } from '../../mappers/RoomEntityDataMapper';
import { createRoomDataMock } from '../../entities/__tests__/utils/mocks';
import { RoomEntity } from '../../../domain/entities/RoomEntity';

describe('InMemoryRoomRepository', () => {
  it('should create a room', async () => {
    const mappingResult = random.word();
    const mapper = {
      map: jest.fn(() => (mappingResult as unknown) as RoomData),
    };
    const roomRepository = new InMemoryRoomRepository(mapper);

    expect(roomRepository.rooms).toHaveLength(0);

    await roomRepository.createRoom(createRoomEntityMock());

    expect(roomRepository.rooms).toHaveLength(1);
  });

  it('should throw if there is no source room to link', async () => {
    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityDataMapperMock(),
    );
    const id = random.word();

    expect(
      roomRepository.linkRooms(id, {
        id: random.word(),
        name: random.word(),
        destinationId: random.word(),
      }),
    ).rejects.toThrowError(new NoRoomError(id));
  });

  it('should throw if there is no destination room to link', async () => {
    const roomRepository = new InMemoryRoomRepository(
      createRoomEntityDataMapperMock(),
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

    const map = jest.fn((room: RoomEntity) => {
      if (room.id === destinationId) {
        return destinationRoomData;
      }

      if (room.id === sourceId) {
        return sourceRoomData;
      }
    });

    const roomRepository = new InMemoryRoomRepository({
      map,
    } as RoomEntityDataMapper);

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
