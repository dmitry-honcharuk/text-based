import { CommandParser } from '../entities/CommandParser';
import { getRelevantObjectIds } from '../entities/Condition';
import { ConditionChecker } from '../entities/ConditionChecker';
import { EffectManager } from '../entities/EffectManager';
import { isGameStarted } from '../entities/GameEntity';
import { GameStatusChecker } from '../entities/GameStatusChacker';
import { RoomEntity } from '../entities/RoomEntity';
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
    private roomRepo: RoomRepository,
    private gameRepo: GameRepository,
    private objectRepo: ObjectRepository,
  ) {}

  async execute({ commandInput, gameId, issuerId }: InputProps) {
    const game = await this.gameRepo.getGameById(gameId);

    if (!game) {
      throw new NoGameError(gameId);
    }

    if (!isGameStarted(game)) {
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
      this.roomRepo,
      this.objectRepo,
    );

    const [command, possibleTargets] = commandParser.parse(commandInput);

    const executionOptions = {
      playerId: issuerId,
      playerRoomId,
      playerRoom,
      gameId,
      command,
      possibleTargets,
    };

    const executedRoomCommand = await this.executeRoomEffect(
      effectManager,
      executionOptions,
    );

    if (!executedRoomCommand) {
      const executedGlobalCommand = await this.executeGlobalCommand(
        effectManager,
        executionOptions,
      );

      if (!executedGlobalCommand) {
        throw new UnknownEffectError(command);
      }
    }

    const conditionChecker = new ConditionChecker();
    const gameStatusChecker = new GameStatusChecker(conditionChecker);

    const roomIds = await this.roomRepo.getGameRoomIds(gameId);
    const objects = await this.objectRepo.getObjectsFromRooms(
      roomIds,
      getRelevantObjectIds([
        ...game.options.looseConditions,
        ...game.options.winConditions,
      ]),
    );

    const gameStatus = gameStatusChecker.getNewStatus(game, objects);

    if (gameStatus !== game.status)
      await this.gameRepo.updateGame(gameId, { status: gameStatus });
  }

  private async executeRoomEffect(
    effectManager: EffectManager,
    options: {
      playerRoomId: string;
      command: string;
      gameId: string;
      playerId: string;
      playerRoom: RoomEntity;
      possibleTargets: string[];
    },
  ): Promise<boolean> {
    const {
      playerRoomId,
      command,
      gameId,
      playerId,
      playerRoom,
      possibleTargets,
    } = options;

    const roomEffects = await this.commandRepo.getRoomEffects({
      roomId: playerRoomId,
      command,
    });

    if (roomEffects.length === 0) {
      return false;
    }

    for (const { effectType, object, context } of roomEffects) {
      const effect = effectManager.getObjectEffect(effectType, object, context);

      try {
        await effect.execute({
          gameId,
          issuerId: playerId,
          issuerRoomId: playerRoomId,
          playerRoom,
          possibleTargets,
        });
        return true;
      } catch (e) {}
    }

    return false;
  }

  private async executeGlobalCommand(
    effectManager: EffectManager,
    options: {
      playerRoomId: string;
      command: string;
      gameId: string;
      playerId: string;
      playerRoom: RoomEntity;
      possibleTargets: string[];
    },
  ): Promise<boolean> {
    const {
      command,
      gameId,
      playerId,
      playerRoom,
      playerRoomId,
      possibleTargets,
    } = options;

    const effectType = await this.commandRepo.getGlobalEffect({
      gameId,
      command,
    });

    if (!effectType) {
      return false;
    }

    const effect = effectManager.getEffect(effectType);

    await effect.execute({
      gameId,
      issuerId: playerId,
      issuerRoomId: playerRoomId,
      playerRoom,
      possibleTargets,
    });

    return true;
  }
}
