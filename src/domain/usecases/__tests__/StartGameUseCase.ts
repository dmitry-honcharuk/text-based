import { random } from 'faker';
import { createGameEntityMock } from '../../entities/__tests__/utils/mocks';
import { GameAlreadyStartedError } from '../../Errors/GameAlreadyStartedError';
import { NoGameError } from '../../Errors/NoGameError';
import { PlayerRepository } from '../../repositories/PlayerRepository';
import {
  createGameRepositoryMock,
  createPlayerRepositoryMock,
} from '../../repositories/__tests__/utils/mocks';
import { StartGameUseCase } from '../StartGameUseCase';

describe('StartGameUseCase', () => {
  let playerRepo: PlayerRepository, playerName: string;

  beforeEach(() => {
    playerName = random.word();
    playerRepo = createPlayerRepositoryMock();
  });

  it('should throw NoGameError if no game with given ID', async () => {
    expect.assertions(1);

    const startGame = new StartGameUseCase(
      createGameRepositoryMock(),
      playerRepo,
    );

    expect(
      startGame.execute({ gameId: random.word(), playerName }),
    ).rejects.toThrowError(NoGameError);
  });

  it('should throw GameAlreadyStartedError if game is already started', async () => {
    expect.assertions(1);

    const gameId = random.word();
    const gameEntity = createGameEntityMock({ id: gameId, isStarted: true });
    const gameRepo = createGameRepositoryMock();

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);

    const startGame = new StartGameUseCase(gameRepo, playerRepo);

    expect(startGame.execute({ gameId, playerName })).rejects.toThrowError(
      GameAlreadyStartedError,
    );
  });

  it('should start a game', async () => {
    expect.assertions(5);

    const gameId = random.word();
    const gameEntity = createGameEntityMock({ id: gameId });
    const gameRepo = createGameRepositoryMock();

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);

    const startGame = new StartGameUseCase(gameRepo, playerRepo);

    await expect(
      startGame.execute({ gameId, playerName }),
    ).resolves.toBeUndefined();

    expect(gameRepo.startGame).toHaveBeenCalledTimes(1);
    expect(gameRepo.startGame).toHaveBeenCalledWith(gameId);

    expect(playerRepo.createPlayer).toHaveBeenCalledTimes(1);
    expect(playerRepo.createPlayer).toHaveBeenCalledWith(playerName, gameId);
  });
});
