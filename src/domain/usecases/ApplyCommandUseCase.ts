import { CommandParser } from '../entities/CommandParser';
import { getRelevantObjectIds } from '../entities/Condition';
import { ConditionChecker } from '../entities/ConditionChecker';
import { EffectManager } from '../entities/EffectManager';
import { EffectTriggerCondition } from '../entities/EffectTrigger';
import { isGameStarted } from '../entities/GameEntity';
import { GameStatusChecker } from '../entities/GameStatusChacker';
import { ObjectEntity } from '../entities/ObjectEntity';
import { RoomEntity } from '../entities/RoomEntity';
import { CannotPerformActionError } from '../Errors/CannotPerformActionError';
import { GameIsNotStartedError } from '../Errors/GameIsNotStartedError';
import { NoGameError } from '../Errors/NoGameError';
import { NoPlayerInGameError } from '../Errors/NoPlayerInGameError';
import { NoPlayerRoomError } from '../Errors/NoPlayerRoomError';
import { UnknownCommandError } from '../Errors/UnknownCommandError';
import { CombatRepository } from '../repositories/CombatRepository';
import { CommandRepository } from '../repositories/CommandRepository';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { PlayerRepository } from '../repositories/PlayerRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { UseCase } from './UseCase';

type InputProps = {
  gameId: string;
  issuerId: string;
  commandInput: string;
};

// @TODO Improve commands to have aliases ( attack|smash|punch )
export class ApplyCommandUseCase implements UseCase<InputProps, Promise<void>> {
  constructor(
    private mapRepo: MapRepository,
    private commandRepo: CommandRepository,
    private roomRepo: RoomRepository,
    private gameRepo: GameRepository,
    private objectRepo: ObjectRepository,
    private combatRepo: CombatRepository,
    private playerRepo: PlayerRepository,
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
      this.combatRepo,
      this.playerRepo,
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

    try {
      await this.executeRoomEffect(effectManager, executionOptions);
    } catch (e) {
      if (!(e instanceof UnknownCommandError)) {
        throw e;
      }

      await this.executeGlobalCommand(effectManager, executionOptions);
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

    if (gameStatus !== game.status) {
      console.log('GAME STATUS CHANGED:', gameStatus);
      await this.gameRepo.updateGame(gameId, { status: gameStatus });
    }

    // @TODO LOGS
    // console.log(await this.mapRepo.getPlayerRoom(gameId, issuerId));
    // console.log(await this.playerRepo.getGamePlayers(gameId));
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
  ): Promise<void> {
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
      throw new UnknownCommandError(command);
    }

    const applicableRoomEffects = roomEffects.filter(({ object }) =>
      this.isValidTarget(object, possibleTargets),
    );

    if (!applicableRoomEffects.length) {
      throw new UnknownCommandError(command);
    }

    const [firstApplicable] = applicableRoomEffects;

    const areConditionsMet = await this.areConditionsMet(
      firstApplicable.conditions,
      { playerId, roomId: playerRoomId },
    );

    if (!areConditionsMet) {
      throw new CannotPerformActionError();
    }

    const objectEffects = applicableRoomEffects.filter(
      ({ object }) => object.id === firstApplicable.object.id,
    );

    for (const { effectType, object, context } of objectEffects) {
      const effect = effectManager.getObjectEffect(effectType, object, context);

      await effect.execute({
        gameId,
        issuerId: playerId,
        issuerRoomId: playerRoomId,
        playerRoom,
        possibleTargets,
      });
    }
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
  ): Promise<void> {
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
      throw new UnknownCommandError(command);
    }

    const effect = effectManager.getEffect(effectType);

    await effect.execute({
      gameId,
      issuerId: playerId,
      issuerRoomId: playerRoomId,
      playerRoom,
      possibleTargets,
    });
  }

  private isValidTarget(
    possibleTarget: ObjectEntity,
    possibleTargets: string[],
  ): boolean {
    return possibleTargets.some(
      (target) =>
        possibleTarget.name === target ||
        possibleTarget.aliases?.includes(target),
    );
  }

  private isConditionMet(
    condition: EffectTriggerCondition,
    appliedStatuses: string[],
  ): boolean {
    return condition.requiredStatuses.every((requiredStatus) =>
      appliedStatuses.includes(requiredStatus),
    );
  }

  private async areConditionsMet(
    conditions: EffectTriggerCondition[],
    options: { roomId: string; playerId: string },
  ): Promise<boolean> {
    const [roomStatuses, playerStatuses] = await Promise.all([
      await this.roomRepo.getRoomStatuses(options.roomId),
      await this.playerRepo.getPlayerStatuses(options.playerId),
    ]);

    console.log('STATUSES', [...roomStatuses, ...playerStatuses]);

    return conditions.every((condition) =>
      this.isConditionMet(condition, [...roomStatuses, ...playerStatuses]),
    );
  }
}
