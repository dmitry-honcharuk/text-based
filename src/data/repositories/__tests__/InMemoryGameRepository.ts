import { random } from 'faker';
import { GameEntity } from '../../../domain/entities/GameEntity';
import { createGameEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { createIdGeneratorMock } from '../../entities/__tests__/utils/mocks';
import { GameDataEntityMapper } from '../../mappers/GameDataEntityMapper';
import { InMemoryGameRepository } from '../InMemoryGameRepository';

describe('InMemoryGameRepository', () => {
  let mapper: GameDataEntityMapper, mappingResult: GameEntity;

  beforeEach(() => {
    mappingResult = createGameEntityMock();

    mapper = {
      map: jest.fn(() => mappingResult),
    };
  });

  afterEach(() => {
    (mapper.map as jest.Mock).mockClear();
  });

  it('should create a game', async () => {
    expect.assertions(3);

    const gameRepository = new InMemoryGameRepository(
      mapper,
      createIdGeneratorMock(),
    );

    expect(gameRepository.games).toHaveLength(0);

    const game = await gameRepository.createGame();

    expect(game).toBe(mappingResult);

    expect(gameRepository.games).toHaveLength(1);
  });

  it('should return NULL if there is no game with given id', async () => {
    expect.assertions(1);

    const gameRepository = new InMemoryGameRepository(
      mapper,
      createIdGeneratorMock(),
    );

    const game = await gameRepository.getGameById(random.word());

    expect(game).toBeNull();
  });

  it('should retrieve a game by id', async () => {
    expect.assertions(1);

    const gameId = '1';

    const gameEntity = createGameEntityMock({ id: gameId });
    const idGenerator = createIdGeneratorMock([gameId]);

    (mapper.map as jest.Mock).mockReturnValue(gameEntity);

    const gameRepository = new InMemoryGameRepository(mapper, idGenerator);

    await gameRepository.createGame();

    const game = await gameRepository.getGameById(gameId);

    expect(game).toBe(gameEntity);
  });

  it('should NOT throw if game to start does not exist', async () => {
    expect.assertions(1);

    const gameRepository = new InMemoryGameRepository(
      mapper,
      createIdGeneratorMock(),
    );

    expect(gameRepository.startGame(random.word())).resolves.not.toThrow();
  });

  it('should start a game with given id', async () => {
    expect.assertions(2);

    const gameId = '1';

    const idGenerator = createIdGeneratorMock([gameId]);

    (mapper.map as jest.Mock).mockImplementation(({ id, isStarted }) => ({
      id,
      isStarted,
    }));

    const gameRepository = new InMemoryGameRepository(mapper, idGenerator);

    await gameRepository.createGame();

    const notStartedGame = await gameRepository.getGameById(gameId);

    expect(notStartedGame?.isStarted).toBe(false);

    await gameRepository.startGame(gameId);

    const startedGame = await gameRepository.getGameById(gameId);

    expect(startedGame?.isStarted).toBe(true);
  });
});
