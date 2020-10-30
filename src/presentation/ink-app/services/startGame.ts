import { StartGameUseCase } from '../../../domain/usecases/StartGameUseCase';
import { gameRepo, mapRepo, playerRepo } from '../dependencies';

export function startGame(gameId: string, playerName: string) {
  return new StartGameUseCase(gameRepo, playerRepo, mapRepo).execute({
    gameId,
    playerName,
  });
}
