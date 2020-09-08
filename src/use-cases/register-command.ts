import { CommandParser } from '../CommandParser';
import { Game } from '../domain/Game';
import { NoSuchPlayerError } from '../Errors/NoSuchPlayerError';
import { GameIsNotStartedError } from '../Errors/GameIsNotStartedError';
import { ActionManager } from '../domain/ActionManager';

interface Dependencies {
  commandParser: CommandParser;
  game: Game;
  actionManager: ActionManager,
}

interface Config {
  issuerName: string;
  command: string;
}

export function makeRegisterCommand(dependencies: Dependencies) {
  const { commandParser, game, actionManager } = dependencies;

  return function registerCommand(config: Config) {
    const { command, issuerName } = config;

    const action = commandParser.parse(command);

    const player = game.getPlayer(issuerName);

    if (!player) {
      throw new NoSuchPlayerError(issuerName);
    }

    if (!game.isStarted) {
      throw new GameIsNotStartedError();
    }

    actionManager.registerAction(action, player);
  };
}
