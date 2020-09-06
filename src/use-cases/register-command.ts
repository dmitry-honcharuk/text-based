import { CommandParser } from '../CommandParser';
import { Game } from '../domain/Game';
import { Player } from '../domain/Player';
import { NoSuchPlayerError } from '../Errors/NoSuchPlayerError';

interface Dependencies {
  commandParser: CommandParser;
  game: Game;
}

interface Config {
  issuerName: string;
  command: string;
}

export function makeRegisterCommand(dependencies: Dependencies) {
  const { commandParser, game } = dependencies;

  return function registerCommand(config: Config) {
    const { command, issuerName } = config;

    const action = commandParser.parse(command);

    const player = game.getPlayer(issuerName);

    if (!player) {
      throw new NoSuchPlayerError(issuerName);
    }

    game.registerAction(action, player);
  };
}
