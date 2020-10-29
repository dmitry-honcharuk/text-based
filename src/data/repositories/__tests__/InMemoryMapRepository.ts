import { random } from 'faker';
import { createRoomRepositoryMock } from '../../../domain/repositories/__tests__/utils/mocks';
import { createIdGeneratorMock } from '../../entities/__tests__/utils/mocks';
import { InMemoryMapRepository } from '../InMemoryMapRepository';

describe('InMemoryMapRepository', () => {
  describe('getGameStartingRoomId', () => {
    it('should return NULL if there is no game starting room', async () => {
      expect.assertions(1);

      const repo = new InMemoryMapRepository(
        createIdGeneratorMock(),
        createRoomRepositoryMock(),
      );

      const actualRoomId = await repo.getGameStartingRoomId(random.word());

      expect(actualRoomId).toBeNull();
    });

    it('should return starting room id', async () => {
      expect.assertions(1);

      const expectedGameId = random.word();
      const expectedStartingRoomId = random.word();

      const repo = new InMemoryMapRepository(
        createIdGeneratorMock(),
        createRoomRepositoryMock(),
      );

      await repo.createMap(expectedGameId, expectedStartingRoomId);

      const actualRoomId = await repo.getGameStartingRoomId(expectedGameId);

      expect(actualRoomId).toBe(expectedStartingRoomId);
    });
  });

  describe('createMap', () => {
    it('should create a game', async () => {
      expect.assertions(4);

      const expectedGameId = random.word();
      const expectedStartingRoomId = random.word();

      const repo = new InMemoryMapRepository(
        createIdGeneratorMock(),
        createRoomRepositoryMock(),
      );

      expect(repo.maps).toHaveLength(0);

      await repo.createMap(expectedGameId, expectedStartingRoomId);

      const actualMap = repo.maps.find(
        ({ gameId }) => gameId === expectedGameId,
      );

      expect(actualMap).not.toBeUndefined();
      expect(actualMap?.startingRoomId).toBe(expectedStartingRoomId);
      expect(actualMap?.playerLocations).toBeInstanceOf(Map);
    });
  });

  describe('spawnPlayer', () => {
    it('should return false if there is no map for given game', async () => {
      expect.assertions(1);

      const expectedGameId = random.word();
      const expectedGlayerId = random.word();
      const expectedRoomId = random.word();

      const repo = new InMemoryMapRepository(
        createIdGeneratorMock(),
        createRoomRepositoryMock(),
      );

      const result = await repo.spawnPlayer(
        expectedGameId,
        expectedGlayerId,
        expectedRoomId,
      );

      expect(result).toBe(false);
    });

    it('should spawn a player', async () => {
      expect.assertions(2);

      const expectedGameId = random.word();
      const expectedPlayerId = random.word();
      const expectedRoomId = random.word();

      const repo = new InMemoryMapRepository(
        createIdGeneratorMock(),
        createRoomRepositoryMock(),
      );

      await repo.createMap(expectedGameId, expectedRoomId);

      const result = await repo.spawnPlayer(
        expectedGameId,
        expectedPlayerId,
        expectedRoomId,
      );

      const actualMap = repo.maps.find(
        ({ gameId }) => gameId === expectedGameId,
      );

      expect(result).toBe(true);
      expect(actualMap?.playerLocations.get(expectedPlayerId)).toBe(
        expectedRoomId,
      );
    });
  });
});
