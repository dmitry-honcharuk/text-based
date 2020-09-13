import { CreateGameUseCase } from './domain/usecases/CreateGameUseCase';
import { InMemoryRoomRepository } from './data/repositories/InMemoryRoomRepository';
import { InMemoryGameRepository } from './data/repositories/InMemoryGameRepository';
import { GameDataEntityMapper } from './data/mappers/GameDataEntityMapper';
import { RoomEntityDataMapper } from './data/mappers/RoomEntityDataMapper';
import { GameConfigValidator } from './domain/entities/GameConfigValidator';
import {
  GameConfig,
  gameConfigValidationSchema,
} from './domain/entities/game-config';

const roomRepository = new InMemoryRoomRepository(new RoomEntityDataMapper());
const gameRepository = new InMemoryGameRepository(new GameDataEntityMapper());
const validator = new GameConfigValidator(gameConfigValidationSchema);

const createGameUseCase = new CreateGameUseCase(
  roomRepository,
  gameRepository,
  validator,
);

const gameConfig: GameConfig = {
  startingRoom: 'lobby',
  rooms: [
    {
      id: 'lobby',
      name: 'Great lobby',
      description: 'Enormous dark scary lobby',
    },
  ],
};

(async () => {
  try {
    await createGameUseCase.execute(gameConfig);
    console.log(gameRepository.games);
    console.log(roomRepository.rooms);
  } catch (e) {
    console.log('CREATE GAME ERROR');
    console.log(e);
  }
})();
