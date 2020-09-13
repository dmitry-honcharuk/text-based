import { CreateGameUseCase } from '../CreateGameUseCase';
import { RoomRepository } from '../../repositories/RoomRepository';
import { GameRepository } from '../../repositories/GameRepository';
import { GameConfigValidator } from '../../entities/GameConfigValidator';
import { GameConfig } from '../../entities/game-config';
import { random } from 'faker';
import { createGameEntityMock } from '../../entities/__tests__/utils/mocks';

describe('CreateGameUseCase', () => {
  it('should create a game', async () => {
    const gameId = random.word();
    const roomRepository: RoomRepository = {
      linkRooms: jest.fn(),
      createRoom: jest.fn(),
    };
    const gameRepository: GameRepository = {
      createGame: jest.fn(() =>
        Promise.resolve(createGameEntityMock({ id: gameId })),
      ),
    };
    const gameConfigValidator: GameConfigValidator = ({
      validate: jest.fn(),
    } as unknown) as GameConfigValidator;

    const createGameUseCase = new CreateGameUseCase(
      roomRepository,
      gameRepository,
      gameConfigValidator,
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
              name:random.word(),
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
    expect(gameRepository.createGame).toHaveBeenCalledTimes(1);
    expect(roomRepository.createRoom).toHaveBeenCalledTimes(2);
    expect(roomRepository.linkRooms).toHaveBeenCalledTimes(1);
  });
});
