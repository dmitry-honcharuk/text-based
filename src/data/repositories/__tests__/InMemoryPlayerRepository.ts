import { random } from 'faker';
import { createPlayerEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { IdGenerator } from '../../entities/IdGenerator';
import { PlayerData } from '../../entities/PlayerData';
import {
  createIdGeneratorMock,
  createPlayerDataMock,
} from '../../entities/__tests__/utils/mocks';
import { PlayerEntityMapper } from '../../mappers/PlayerEntityMapper';
import { createPlayerEntityMapperMock } from '../../mappers/__tests__/utils/mocks';
import { InMemoryPlayerRepository } from '../InMemoryPlayerRepository';

jest.mock('../../entities/PlayerData');

describe('InMemoryPlayerRepository', () => {
  let idGenerator: IdGenerator, mapper: PlayerEntityMapper;

  beforeEach(() => {
    idGenerator = createIdGeneratorMock();
    mapper = createPlayerEntityMapperMock();
  });

  describe('createPlayer', () => {
    it('should create player', async () => {
      expect.assertions(6);

      const playerName = random.word();
      const gameId = random.word();
      const expectedPlayerEntity = createPlayerEntityMock();
      const expectedPlayerData = createPlayerDataMock();

      (PlayerData as jest.Mock).mockReturnValueOnce(expectedPlayerData);
      (mapper.fromDataToEntity as jest.Mock).mockReturnValueOnce(
        expectedPlayerEntity,
      );

      const repo = new InMemoryPlayerRepository(idGenerator, mapper);

      expect(repo.players).toHaveLength(0);

      const actualPlayerEntity = await repo.createPlayer(playerName, gameId);

      expect(repo.players).toHaveLength(1);

      expect(repo.players).toEqual([expectedPlayerData]);

      expect(actualPlayerEntity).toBe(expectedPlayerEntity);

      expect(mapper.fromDataToEntity).toHaveBeenCalledTimes(1);
      expect(mapper.fromDataToEntity).toHaveBeenCalledWith(expectedPlayerData);
    });
  });

  describe('getGamePlayers', () => {
    it('should return an empty array if no player is linked to the game', async () => {
      expect.assertions(1);

      const repo = new InMemoryPlayerRepository(idGenerator, mapper);

      repo.players.push(
        createPlayerDataMock({ gameId: '2' }),
        createPlayerDataMock({ gameId: '3' }),
        createPlayerDataMock({ gameId: '4' }),
        createPlayerDataMock({ gameId: '5' }),
      );

      const actualPlayers = await repo.getGamePlayers('1');

      expect(actualPlayers).toHaveLength(0);
    });

    it('should return all players that are linked to the game', async () => {
      expect.assertions(4);

      const playerData1 = createPlayerDataMock({ gameId: '1' });
      const playerData2 = createPlayerDataMock({ gameId: '1' });

      const repo = new InMemoryPlayerRepository(idGenerator, mapper);

      repo.players.push(
        playerData1,
        createPlayerDataMock({ gameId: '2' }),
        createPlayerDataMock({ gameId: '3' }),
        playerData2,
      );

      const actualPlayers = await repo.getGamePlayers('1');

      expect(actualPlayers).toHaveLength(2);
      expect(mapper.fromDataToEntity).toHaveBeenCalledTimes(2);
      expect(mapper.fromDataToEntity).toHaveBeenNthCalledWith(1, playerData1);
      expect(mapper.fromDataToEntity).toHaveBeenNthCalledWith(2, playerData2);
    });
  });
});
