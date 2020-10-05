import { GameRepository } from '../repositories/GameRepository';
import { GameAlreadyStartedError } from '../Errors/GameAlreadyStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
};

export class StartGameUseCase implements UseCase<InputProps, Promise<void>> {
  constructor(private gameRepository: GameRepository) {}

  async execute(input: InputProps) {
    const { gameId } = input;

    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (game.isStarted) {
      throw new GameAlreadyStartedError(gameId);
    }

    await this.gameRepository.startGame(gameId);
  }
}
