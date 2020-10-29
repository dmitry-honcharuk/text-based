import { EffectType } from '../../domain/Effects/EffectType';
import {
  AddCommand,
  CommandRepository,
  GetCommand,
} from '../../domain/repositories/CommandRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';

type CommandData = {
  gameId: string;
  command: string;
  effect: EffectType;
  roomId?: string;
};

export class InMemoryCommandRepository implements CommandRepository {
  public readonly gameCommands: Map<
    string,
    Map<string, Pick<CommandData, 'effect' | 'roomId'>>
  > = new Map();

  async addCommand(dto: AddCommand): Promise<void> {
    const { gameId, command: commandInput, effect, roomId } = dto;

    const commands = this.gameCommands.get(gameId);

    if (!commands) {
      this.gameCommands.set(
        gameId,
        new Map([[commandInput, { effect, roomId }]]),
      );
    }

    commands?.set(commandInput, { effect, roomId });
  }

  async getEffect(dto: GetCommand): DeferredNullable<EffectType> {
    const { gameId, command } = dto;

    return this.gameCommands.get(gameId)?.get(command)?.effect ?? null;
  }
}
