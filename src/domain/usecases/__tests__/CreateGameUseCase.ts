import { random } from 'faker';
import { GameConfig } from '../../entities/game-config';
import { GameConfigValidator } from '../../entities/GameConfigValidator';
import {
  createGameRepositoryMock,
  createMapRepositoryMock,
  createRoomRepositoryMock,
} from '../../repositories/__tests__/utils/mocks';
import { CreateGameUseCase } from '../CreateGameUseCase';

describe('CreateGameUseCase', () => {
  it('should create a game', async () => {
    expect.assertions(8);

    const gameId = random.word();
    const roomRepo = createRoomRepositoryMock();
    const gameRepo = createGameRepositoryMock();
    const mapRepo = createMapRepositoryMock();

    ((gameRepo.createGame as unknown) as jest.Mock).mockReturnValue(
      Promise.resolve(gameId),
    );

    const gameConfigValidator: GameConfigValidator = ({
      validate: jest.fn(),
    } as unknown) as GameConfigValidator;

    const createGameUseCase = new CreateGameUseCase(
      gameConfigValidator,
      roomRepo,
      gameRepo,
      mapRepo,
    );

    const startingRoomId = random.word();
    const exitRoomId = random.word();
    const gameConfig: GameConfig = {
      startingRoom: startingRoomId,
      rooms: [
        {
          id: startingRoomId,
          name: random.word(),
          description: random.words(),
          exits: [
            {
              roomId: exitRoomId,
              id: random.word(),
              name: random.word(),
            },
          ],
        },
        {
          id: exitRoomId,
          name: random.word(),
          description: random.words(),
        },
      ],
    };

    const actual = createGameUseCase.execute(gameConfig);

    await expect(actual).resolves.not.toThrow();
    await expect(actual).resolves.toBe(gameId);

    expect(gameConfigValidator.validate).toHaveBeenCalledTimes(1);

    expect(gameRepo.createGame).toHaveBeenCalledTimes(1);
    expect(roomRepo.createRoom).toHaveBeenCalledTimes(2);

    expect(roomRepo.linkRooms).toHaveBeenCalledTimes(1);

    expect(mapRepo.createMap).toHaveBeenCalledTimes(1);
    expect(mapRepo.createMap).toHaveBeenCalledWith(gameId, startingRoomId);
  });
});
