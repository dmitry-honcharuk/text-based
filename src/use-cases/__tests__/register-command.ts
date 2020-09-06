import { Game } from '../../domain/Game';
import { CommandParser } from '../../CommandParser';
import {
  createRandomGame,
  createRandomCommandParser,
  createRandomPlayer,
} from '../../domain/__tests__/utils/random.util';
import { Player } from '../../domain/Player';
import { makeRegisterCommand } from '../register-command';
import { UnknownCommandError } from '../../Errors/UnknownCommandError';
import { random } from 'faker';
import { createRandomAction } from '../../domain/actions/__tests__/utils/random';
import { NoSuchPlayerError } from '../../Errors/NoSuchPlayerError';
import { GameIsNotStartedError } from '../../Errors/GameIsNotStartedError';

describe('Register command', () => {
  let game: Game, commandParser: CommandParser, player: Player;

  beforeEach(() => {
    game = createRandomGame();
    commandParser = createRandomCommandParser();
    player = createRandomPlayer();
  });

  it('should throw if command was not registered in parser', () => {
    const commandName = random.word();

    const registerCommand = makeRegisterCommand({
      commandParser,
      game,
    });

    expect(() => {
      registerCommand({ command: commandName, issuerName: player.name });
    }).toThrowError(new UnknownCommandError(commandName));
  });

  it('should throw if player was not registered in the game', () => {
    const commandName = random.word();

    commandParser.registerCommand(commandName, createRandomAction);

    const registerCommand = makeRegisterCommand({
      commandParser,
      game,
    });

    expect(() => {
      registerCommand({ command: commandName, issuerName: player.name });
    }).toThrowError(new NoSuchPlayerError(player.name));
  });

  it.only('should throw if game is not started yet', () => {
    const commandName = random.word();

    commandParser.registerCommand(commandName, createRandomAction);

    game.addPlayer(player);

    const registerCommand = makeRegisterCommand({
      commandParser,
      game,
    });

    expect(() => {
      registerCommand({ command: commandName, issuerName: player.name });
    }).toThrowError(new GameIsNotStartedError());
  });

  it.only('should properly register the command', () => {
    const commandName = random.word();

    commandParser.registerCommand(commandName, createRandomAction);

    game.addPlayer(player);

    game.start();

    const registerCommand = makeRegisterCommand({
      commandParser,
      game,
    });

    expect(() => {
      registerCommand({ command: commandName, issuerName: player.name });
    }).not.toThrow();
  });
});
