import {
  GameConfig,
  gameConfigValidationSchema,
} from '../../../domain/entities/game-config';
import { GameConfigValidator } from '../../../domain/entities/GameConfigValidator';
import { CreateGameUseCase } from '../../../domain/usecases/CreateGameUseCase';
import {
  commandRepo,
  gameRepo,
  mapRepo,
  objectRepo,
  roomRepo,
} from '../dependencies';

export async function createGame(config: GameConfig) {
  const createGameUseCase = new CreateGameUseCase(
    new GameConfigValidator(gameConfigValidationSchema),
    roomRepo,
    gameRepo,
    mapRepo,
    commandRepo,
    objectRepo,
  );

  return createGameUseCase.execute(config);
}
