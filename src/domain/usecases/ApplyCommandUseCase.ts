import { CommandParser } from '../entities/CommandParser';
import { EffectManager } from '../entities/EffectManager';
import { GameIsNotStartedError } from '../Errors/GameIsNotStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { NoPlayerInGameError } from '../Errors/NoPlayerInGameError';
import { NoPlayerRoomError } from '../Errors/NoPlayerRoomError';
import { UnknownEffectError } from '../Errors/UnknownEffectError';
import { CommandRepository } from '../repositories/CommandRepository';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
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
    private objectRepo: ObjectRepository,
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

    const roomIdPair = await this.mapRepo.getPlayerRoom(gameId, issuerId);

    if (!roomIdPair) {
      throw new NoPlayerRoomError(issuerId);
    }

    const [playerRoomId, playerRoom] = roomIdPair;

    const commandParser = new CommandParser();
    const effectManager = new EffectManager(
      this.mapRepo,
      this.roomReppo,
      this.objectRepo,
    );

    const [command, possibleTargets] = commandParser.parse(commandInput);
    const roomEffects = await this.commandRepo.getRoomEffects({
      roomId: playerRoomId,
      command,
    });

    if (roomEffects.length === 0) {
      throw new UnknownEffectError(command);
    }

    for (const { effectType, object, context } of roomEffects) {
      const effect = effectManager.getObjectEffect(effectType, object, context);

      try {
        return await effect.execute({
          gameId,
          issuerId,
          issuerRoomId: playerRoomId,
          playerRoom,
          possibleTargets,
        });
      } catch (e) {}
    }

    const effectType = await this.commandRepo.getGlobalEffect({
      gameId,
      command,
    });

    if (!effectType) {
      throw new UnknownEffectError(command);
    }

    const effect = effectManager.getEffect(effectType);

    await effect.execute({
      gameId,
      issuerId,
      issuerRoomId: playerRoomId,
      playerRoom,
      possibleTargets,
    });
  }
}
