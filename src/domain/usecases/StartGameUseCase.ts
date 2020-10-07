import { GameAlreadyStartedError } from '../Errors/GameAlreadyStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { GameRepository } from '../repositories/GameRepository';
import { PlayerRepository } from '../repositories/PlayerRepository';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
  playerName: string;
};

export class StartGameUseCase implements UseCase<InputProps, Promise<void>> {
  constructor(
    private gameRepository: GameRepository,
    private playerRepository: PlayerRepository,
  ) {}

  async execute(input: InputProps) {
    const { gameId, playerName } = input;

    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (game.isStarted) {
      throw new GameAlreadyStartedError(gameId);
    }

    await this.playerRepository.createPlayer(playerName, gameId);
    await this.gameRepository.startGame(gameId);
  }
}
