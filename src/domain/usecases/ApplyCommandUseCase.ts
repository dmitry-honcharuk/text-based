import { CommandParser } from '../entities/CommandParser';
import { EffectManager } from '../entities/EffectManager';
import { GameIsNotStartedError } from '../Errors/GameIsNotStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { NoPlayerInGameError } from '../Errors/NoPlayerInGameError';
import { UnknownEffectError } from '../Errors/UnknownEffectError';
import { CommandRepository } from '../repositories/CommandRepository';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
  issuerId: string;
  commandInput: string;
};

export class ApplyCommandUseCase implements UseCase<InputProps, Promise<void>> {
  constructor(
    private mapRepo: MapRepository,
    private commandRepo: CommandRepository,
    private roomReppo: RoomRepository,
    private gameRepo: GameRepository,
  ) {}

  async execute({ commandInput, gameId, issuerId }: InputProps) {
    const game = await this.gameRepo.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (!game.isStarted) {
      throw new GameIsNotStartedError(gameId);
    }

    const hasPlayer = await this.gameRepo.hasPlayer(issuerId);

    if (!hasPlayer) {
      throw new NoPlayerInGameError(gameId, issuerId);
    }

    const commandParser = new CommandParser();
    const effectManager = new EffectManager(this.mapRepo, this.roomReppo);

    const [command, possibleTargets] = commandParser.parse(commandInput);
    const effectType = await this.commandRepo.getEffect({ gameId, command });

    if (!effectType) {
      throw new UnknownEffectError(command);
    }

    const effect = effectManager.getEffect(effectType);

    await effect.execute(gameId, issuerId, possibleTargets);
  }
}
