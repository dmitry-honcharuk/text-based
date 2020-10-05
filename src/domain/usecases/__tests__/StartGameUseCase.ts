import { random } from 'faker';
import { createGameEntityMock } from '../../entities/__tests__/utils/mocks';
import { GameAlreadyStartedError } from '../../Errors/GameAlreadyStartedError';
import { NoGameError } from '../../Errors/NoGameError';
import { createGameRepositoryMock } from '../../repositories/__tests__/utils/mocks';
import { StartGameUseCase } from '../StartGameUseCase';

describe('StartGameUseCase', () => {
  it('should throw NoGameError if no game with given ID', async () => {
    expect.assertions(1);

    const startGame = new StartGameUseCase(createGameRepositoryMock());

    expect(startGame.execute({ gameId: random.word() })).rejects.toThrowError(
      NoGameError,
    );
  });

  it('should throw GameAlreadyStartedError if game is already started', async () => {
    expect.assertions(1);

    const gameId = random.word();
    const gameEntity = createGameEntityMock({ id: gameId, isStarted: true });
    const gameRepo = createGameRepositoryMock();

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);

    const startGame = new StartGameUseCase(gameRepo);

    expect(startGame.execute({ gameId })).rejects.toThrowError(
      GameAlreadyStartedError,
    );
  });

  it('should start a game', async () => {
    expect.assertions(3);

    const gameId = random.word();
    const gameEntity = createGameEntityMock({ id: gameId });
    const gameRepo = createGameRepositoryMock();

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);

    const startGame = new StartGameUseCase(gameRepo);

    await expect(startGame.execute({ gameId })).resolves.toBeUndefined();
    expect(gameRepo.startGame).toHaveBeenCalledTimes(1);
    expect(gameRepo.startGame).toHaveBeenCalledWith(gameId);
  });
});
