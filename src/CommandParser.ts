import { BaseAction } from './domain/actions/BaseAction';
import { UnknownCommandError } from './Errors/UnknownCommandError';
import { Factory } from './utils/Factory';

export type ActionFactory = Factory<BaseAction<unknown>, { target: string }>;

export class CommandParser {
  private commandActionMap: Map<string, ActionFactory> = new Map();

  constructor() {}

  registerCommand(name: string, commandFactory: ActionFactory) {
    this.commandActionMap.set(name, commandFactory);
  }

  parse(command: string) {
    const [commandName, commandTarget] = command.split(' ');

    const actionFactory = this.commandActionMap.get(commandName);

    if (!actionFactory) {
      throw new UnknownCommandError(commandName);
    }

    return actionFactory({ target: commandTarget });
  }
}
