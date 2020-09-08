import { UnknownCommandError } from './Errors/UnknownCommandError';
import { Factory } from './utils/Factory';
import { Action } from './domain/actions/Action';

export type ActionFactory = Factory<Action, { target: string }>;

export class CommandParser {
  private commandActionMap: Map<string, ActionFactory> = new Map();

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
