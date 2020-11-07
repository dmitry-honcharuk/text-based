import { random } from 'faker';
import { GameEntity, GameStatus } from '../../../domain/entities/GameEntity';
import {
  createGameEntityMock,
  createGameOptionsMock,
  createPlayerEntityMock,
} from '../../../domain/entities/__tests__/utils/mocks';
import { PlayerRepository } from '../../../domain/repositories/PlayerRepository';
import { createPlayerRepositoryMock } from '../../../domain/repositories/__tests__/utils/mocks';
import { IdGenerator } from '../../entities/IdGenerator';
import {
  createGameDataMock,
  createIdGeneratorMock,
} from '../../entities/__tests__/utils/mocks';
import { GameEntityMapper } from '../../mappers/GameEntityMapper';
import { createGameEntityMapperMock } from '../../mappers/__tests__/utils/mocks';
import { InMemoryGameRepository } from '../InMemoryGameRepository';

describe('InMemoryGameRepository', () => {
  let mapper: GameEntityMapper,
    mappingResult: GameEntity,
    idGenerator: IdGenerator,
    playerRepo: PlayerRepository;

  beforeEach(() => {
    mappingResult = createGameEntityMock();

    mapper = createGameEntityMapperMock({
      fromDataToEntity: () => mappingResult,
    });

    idGenerator = createIdGeneratorMock();
    playerRepo = createPlayerRepositoryMock();
  });

  afterEach(() => {
    (mapper.fromDataToEntity as jest.Mock).mockClear();
  });

  describe('createGame', () => {
    it('should return an id of created game', async () => {
      expect.assertions(3);

      const expectedGameId = random.word();

      const gameRepository = new InMemoryGameRepository(
        mapper,
        createIdGeneratorMock([expectedGameId]),
        playerRepo,
      );

      expect(gameRepository.games).toHaveLength(0);

      const actualGameId = await gameRepository.createGame(
        createGameOptionsMock(),
      );

      expect(actualGameId).toBe(expectedGameId);

      expect(gameRepository.games).toHaveLength(1);
    });
  });

  describe('getGameById', () => {
    it('should return NULL if there is no game with given id', async () => {
      expect.assertions(1);

      const gameRepository = new InMemoryGameRepository(
        mapper,
        idGenerator,
        playerRepo,
      );

      const game = await gameRepository.getGameById(random.word());

      expect(game).toBeNull();
    });

    it('should retrieve a game by id', async () => {
      expect.assertions(3);

      const gameId = random.word();

      const expectedGameEntity = createGameEntityMock();
      const expectedGameData = createGameDataMock({ id: gameId });
      const expectedPlayers = [
        createPlayerEntityMock(),
        createPlayerEntityMock(),
        createPlayerEntityMock(),
      ];

      (mapper.fromDataToEntity as jest.Mock).mockReturnValue(
        expectedGameEntity,
      );
      (playerRepo.getGamePlayers as jest.Mock).mockReturnValue(expectedPlayers);

      const gameRepository = new InMemoryGameRepository(
        mapper,
        idGenerator,
        playerRepo,
      );

      gameRepository.games.push(expectedGameData);

      const game = await gameRepository.getGameById(gameId);

      expect(game).toBe(expectedGameEntity);

      expect(mapper.fromDataToEntity).toHaveBeenCalledTimes(1);
      expect(mapper.fromDataToEntity).toHaveBeenCalledWith(
        expectedGameData,
        expectedPlayers,
        gameRepository.defaultPlayerAttributes,
      );
    });

    it('should NOT throw if game to start does not exist', async () => {
      expect.assertions(1);

      const gameRepository = new InMemoryGameRepository(
        mapper,
        idGenerator,
        playerRepo,
      );

      expect(gameRepository.startGame(random.word())).resolves.not.toThrow();
    });
  });

  describe('startGame', () => {
    it('should start a game with given id', async () => {
      expect.assertions(2);

      const gameId = '1';

      const idGenerator = createIdGeneratorMock([gameId]);

      (mapper.fromDataToEntity as jest.Mock).mockImplementation((data) => data);

      const gameRepository = new InMemoryGameRepository(
        mapper,
        idGenerator,
        playerRepo,
      );

      await gameRepository.createGame(createGameOptionsMock());

      const notStartedGame = await gameRepository.getGameById(gameId);

      expect(notStartedGame?.status).not.toBe(GameStatus.Started);

      await gameRepository.startGame(gameId);

      const startedGame = await gameRepository.getGameById(gameId);

      expect(startedGame?.status).toBe(GameStatus.Started);
    });
  });
});
