import { GameAlreadyStartedError } from '../Errors/GameAlreadyStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { NoStartingRoomError } from '../Errors/NoStartingRoomError';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { PlayerRepository } from '../repositories/PlayerRepository';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
  playerName: string;
};

export class StartGameUseCase implements UseCase<InputProps, Promise<string>> {
  constructor(
    private gameRepository: GameRepository,
    private playerRepository: PlayerRepository,
    private mapRepository: MapRepository,
  ) {}

  async execute(input: InputProps): Promise<string> {
    const { gameId, playerName } = input;

    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (game.isStarted) {
      throw new GameAlreadyStartedError(gameId);
    }

    const startingRoomId = await this.mapRepository.getGameStartingRoomId(
      gameId,
    );

    if (!startingRoomId) {
      throw new NoStartingRoomError(gameId);
    }

    const playerId = await this.playerRepository.createPlayer(
      gameId,
      playerName,
      game.defaultPlayerAttributes,
    );

    await this.mapRepository.spawnPlayer(gameId, playerId, startingRoomId);
    await this.gameRepository.addPlayer(playerId);
    await this.gameRepository.startGame(gameId);

    return playerId;
  }
}
