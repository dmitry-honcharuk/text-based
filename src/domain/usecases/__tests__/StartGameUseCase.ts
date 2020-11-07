import { random } from 'faker';
import { GameStatus } from '../../entities/GameEntity';
import {
  createEntityAttributesMock,
  createGameEntityMock,
} from '../../entities/__tests__/utils/mocks';
import { GameAlreadyStartedError } from '../../Errors/GameAlreadyStartedError';
import { NoGameError } from '../../Errors/NoGameError';
import { NoStartingRoomError } from '../../Errors/NoStartingRoomError';
import { GameRepository } from '../../repositories/GameRepository';
import { MapRepository } from '../../repositories/MapRepository';
import { PlayerRepository } from '../../repositories/PlayerRepository';
import {
  createGameRepositoryMock,
  createMapRepositoryMock,
  createPlayerRepositoryMock,
} from '../../repositories/__tests__/utils/mocks';
import { StartGameUseCase } from '../StartGameUseCase';

describe('StartGameUseCase', () => {
  let playerName: string,
    playerRepo: PlayerRepository,
    mapRepo: MapRepository,
    gameRepo: GameRepository;

  beforeEach(() => {
    playerName = random.word();
    playerRepo = createPlayerRepositoryMock();
    mapRepo = createMapRepositoryMock();
    gameRepo = createGameRepositoryMock();
  });

  it('should throw NoGameError if no game with given ID', async () => {
    expect.assertions(1);

    const startGame = new StartGameUseCase(gameRepo, playerRepo, mapRepo);

    expect(
      startGame.execute({ gameId: random.word(), playerName }),
    ).rejects.toThrowError(NoGameError);
  });

  it('should throw GameAlreadyStartedError if game is already started', async () => {
    expect.assertions(1);

    const gameId = random.word();
    const gameEntity = createGameEntityMock({ status: GameStatus.Started });

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);

    const startGame = new StartGameUseCase(gameRepo, playerRepo, mapRepo);

    expect(startGame.execute({ gameId, playerName })).rejects.toThrowError(
      GameAlreadyStartedError,
    );
  });

  it('should throw NoStartingRoomError game has no connected starting room', () => {
    expect.assertions(1);

    const gameEntity = createGameEntityMock();

    const expectedPlayerId = random.word();

    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);
    (playerRepo.createPlayer as jest.Mock).mockReturnValueOnce(
      expectedPlayerId,
    );

    const startGame = new StartGameUseCase(gameRepo, playerRepo, mapRepo);

    expect(
      startGame.execute({ gameId: random.word(), playerName }),
    ).rejects.toThrowError(NoStartingRoomError);
  });

  it('should start a game', async () => {
    expect.assertions(7);

    const gameEntity = createGameEntityMock({
      defaultPlayerAttributes: createEntityAttributesMock(),
    });

    const expectedGameId = random.word();
    const expectedPlayerId = random.word();
    const expectedRoomId = random.word();

    (mapRepo.getGameStartingRoomId as jest.Mock).mockReturnValueOnce(
      expectedRoomId,
    );
    (gameRepo.getGameById as jest.Mock).mockReturnValueOnce(gameEntity);
    (playerRepo.createPlayer as jest.Mock).mockReturnValueOnce(
      expectedPlayerId,
    );

    const startGame = new StartGameUseCase(gameRepo, playerRepo, mapRepo);

    await expect(
      startGame.execute({ gameId: expectedGameId, playerName }),
    ).resolves.toBe(expectedPlayerId);

    expect(gameRepo.startGame).toHaveBeenCalledTimes(1);
    expect(gameRepo.startGame).toHaveBeenCalledWith(expectedGameId);

    expect(playerRepo.createPlayer).toHaveBeenCalledTimes(1);
    expect(playerRepo.createPlayer).toHaveBeenCalledWith(
      expectedGameId,
      playerName,
      gameEntity.defaultPlayerAttributes,
    );

    expect(mapRepo.spawnPlayer).toHaveBeenCalledTimes(1);
    expect(mapRepo.spawnPlayer).toHaveBeenCalledWith(
      expectedGameId,
      expectedPlayerId,
      expectedRoomId,
    );
  });
});
