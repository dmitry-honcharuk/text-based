import { random } from 'faker';
import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { NoRoomError } from '../../../domain/Errors/NoRoomError';
import { RoomData, RoomDataExit } from '../../entities/RoomData';
import {
  createIdGeneratorMock,
  createRoomDataMock,
} from '../../entities/__tests__/utils/mocks';
import { createRoomEntityMapperMock } from '../../mappers/__tests__/utils/mocks';
import { InMemoryRoomRepository } from '../InMemoryRoomRepository';

describe('InMemoryRoomRepository', () => {
  describe('createRoom', () => {
    it('should create a room', async () => {
      expect.assertions(2);

      const gameId = random.word();
      const roomRepository = new InMemoryRoomRepository(
        createRoomEntityMapperMock(),
        createIdGeneratorMock()
      );

      expect(roomRepository.rooms).toHaveLength(0);

      await roomRepository.createRoom(gameId, createRoomEntityMock());

      expect(roomRepository.rooms).toHaveLength(1);
    });
  });

  describe('linkRooms', () => {
    it('should throw if there is no source room to link', async () => {
      expect.assertions(1);

      const roomRepository = new InMemoryRoomRepository(
        createRoomEntityMapperMock(),
        createIdGeneratorMock()
      );
      const id = random.word();

      await expect(
        roomRepository.linkRooms(random.word(), id, {
          id: random.word(),
          name: random.word(),
          destinationRoomId: random.word(),
        })
      ).rejects.toThrowError(new NoRoomError(id));
    });

    it('should throw if there is no destination room to link', async () => {
      expect.assertions(1);

      const roomRepository = new InMemoryRoomRepository(
        createRoomEntityMapperMock({
          fromEntityToData: createRoomDataMock,
        }),
        createIdGeneratorMock()
      );
      const gameId = random.word();
      const sourceId = random.word();
      const destinationRoomId = random.word();

      await roomRepository.createRoom(
        gameId,
        createRoomEntityMock({
          id: sourceId,
        })
      );

      await expect(
        roomRepository.linkRooms(gameId, sourceId, {
          id: random.word(),
          name: random.word(),
          destinationRoomId,
        })
      ).rejects.toThrowError(NoRoomError);
    });

    it('should link two rooms', async () => {
      expect.assertions(2);

      const gameId = random.word();
      const sourceId = random.word();
      const customDestinationRoomId = random.word();

      const sourceRoomData = createRoomDataMock({
        customId: sourceId,
        gameId,
      });

      const destinationRoomData = createRoomDataMock({
        customId: customDestinationRoomId,
        gameId,
      });

      const sourceRoomEntity = createRoomEntityMock({
        id: sourceId,
      });

      const destinationRoomEntity = createRoomEntityMock({
        id: customDestinationRoomId,
      });

      const exitId = random.word();
      const exitName = random.word();
      const expectedExit: RoomDataExit = {
        id: exitId,
        name: exitName,
        destinationRoomId: destinationRoomData.id,
      };

      const fromEntityToData = (room: RoomData) => {
        if (room.id === customDestinationRoomId) {
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
        createIdGeneratorMock()
      );

      await roomRepository.createRoom(gameId, sourceRoomEntity);
      await roomRepository.createRoom(gameId, destinationRoomEntity);

      await expect(
        roomRepository.linkRooms(gameId, sourceId, {
          id: exitId,
          name: exitName,
          destinationRoomId: customDestinationRoomId,
        })
      ).resolves.not.toThrowError();

      expect(sourceRoomData.exits).toEqual([expectedExit]);
    });
  });

  describe('getRoomById', () => {
    it('should return null if there is no room with given id', async () => {
      expect.assertions(1);

      const repo = new InMemoryRoomRepository(
        createRoomEntityMapperMock(),
        createIdGeneratorMock()
      );

      const expectedRoomId = random.word();

      const actualRoomEntity = await repo.getRoomById(expectedRoomId);

      expect(actualRoomEntity).toBeNull();
    });

    it('should return room with given id', async () => {
      expect.assertions(1);

      const mapper = createRoomEntityMapperMock();

      const repo = new InMemoryRoomRepository(mapper, createIdGeneratorMock());

      const expectedRoomId = random.word();
      const expectedRoomEntity = createRoomEntityMock();
      const expectedRoomData = createRoomDataMock({ id: expectedRoomId });

      repo.rooms.push(expectedRoomData);

      (mapper.fromDataToEntity as jest.Mock).mockReturnValueOnce(
        expectedRoomEntity
      );

      const actualRoomEntity = await repo.getRoomById(expectedRoomId);

      expect(actualRoomEntity).toBe(expectedRoomEntity);
    });
  });
});
