import { EffectType } from '../../domain/Effects/EffectType';
import { EffectTrigger } from '../../domain/entities/EffectTrigger';
import {
  AddCommand,
  AddRoomCommandDto,
  CommandRepository,
  GetCommand,
  GetRoomEffectRequestDto,
  GetRoomEffectResponseDto,
} from '../../domain/repositories/CommandRepository';
import { ObjectRepository } from '../../domain/repositories/ObjectRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';

export class InMemoryCommandRepository implements CommandRepository {
  public readonly gameCommands: Map<string, Map<string, EffectType>> =
    new Map();

  public readonly roomCommands: Map<
    string,
    Map<
      string,
      [objectId: string, triggers: EffectTrigger[], aliases: string[]]
    >
  > = new Map();

  constructor(private objectRepo: ObjectRepository) {}

  async addGlobalCommand(dto: AddCommand): Promise<void> {
    const { gameId, command, effect } = dto;

    const commands = Array.isArray(command) ? command : [command];

    const existingCommands = this.gameCommands.get(gameId);

    if (!existingCommands) {
      this.gameCommands.set(
        gameId,
        new Map(commands.map((command) => [command, effect])),
      );

      return;
    }

    for (const command of commands) {
      existingCommands?.set(command, effect);
    }
  }

  async addRoomCommand(dto: AddRoomCommandDto): Promise<void> {
    const { command, roomId, object, effectTriggers } = dto;

    const roomCommands = this.roomCommands.get(roomId);

    const aliases = object.aliases ?? [];

    if (!roomCommands) {
      this.roomCommands.set(
        roomId,
        new Map([[command, [object.id, effectTriggers, aliases]]]),
      );
    }

    roomCommands?.set(command, [object.id, effectTriggers, aliases]);
  }

  async getGlobalEffect(dto: GetCommand): DeferredNullable<EffectType> {
    const { gameId, command } = dto;

    return this.gameCommands.get(gameId)?.get(command) ?? null;
  }

  async getRoomEffects(
    dto: GetRoomEffectRequestDto,
  ): Promise<GetRoomEffectResponseDto> {
    const { roomId, command } = dto;

    const objectTriggersPair = this.roomCommands.get(roomId)?.get(command);

    if (!objectTriggersPair) return [];

    const [objectId, triggers] = objectTriggersPair;

    const object = await this.objectRepo.getRoomObject(roomId, objectId);

    if (!object) return [];

    return triggers.map((trigger) => ({
      effectType: trigger.type,
      context: trigger.options,
      object,
    }));
  }
}
