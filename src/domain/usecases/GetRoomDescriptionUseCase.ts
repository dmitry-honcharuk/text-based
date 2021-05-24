import { isGameStarted } from '../entities/GameEntity';
import { DomainError } from '../Errors/DomainError';
import { GameIsNotStartedError } from '../Errors/GameIsNotStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
  playerId: string;
};

export class GetRoomDescriptionUseCase
  implements UseCase<InputProps, Promise<string>>
{
  constructor(
    private gameRepository: GameRepository,
    private mapRepository: MapRepository,
  ) {}

  async execute(input: InputProps): Promise<string> {
    const { gameId, playerId } = input;

    const game = await this.gameRepository.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (!isGameStarted(game)) {
      throw new GameIsNotStartedError(gameId);
    }

    const roomPair = await this.mapRepository.getPlayerRoom(gameId, playerId);

    if (!roomPair) {
      throw new DomainError('No player room');
    }

    const [, room] = roomPair;

    return room.description;
  }
}
