import { CommandParser } from '../CommandParser';
import { createRandomPlayer } from '../domain/__tests__/utils/random.util';
import { Player } from '../domain/Player';
import { MoveAction } from '../domain/actions/MoveAction';
import { UnknownCommandError } from '../Errors/UnknownCommandError';

describe('Command parser', () => {
  let player: Player;

  beforeEach(() => {
    player = createRandomPlayer();
  });

  it('should throw while parsing unregistered command', () => {
    const parser = new CommandParser();

    expect(() => {
      parser.parse('go north');
    }).toThrowError(new UnknownCommandError('go'));
  });

  it('should NOT throw while parsing unregistered command', () => {
    const parser = new CommandParser();

    parser.registerCommand(
      'go',
      ({ target }) => new MoveAction({ direction: target }),
    );

    expect(() => {
      parser.parse('go north');
    }).not.toThrowError(new UnknownCommandError('go'));
  });

  it('should resolve a registered Action for command', () => {
    const parser = new CommandParser();

    parser.registerCommand(
      'go',
      ({ target }) => new MoveAction({ direction: target }),
    );

    const action = parser.parse('go north');

    expect(action).toBeInstanceOf(MoveAction);
  });

  it('should resolve destination properly', () => {
    let actualDestination;
    const destination = 'north';
    const parser = new CommandParser();

    parser.registerCommand('go', ({ target }) => {
      actualDestination = target;

      return new MoveAction({ direction: target });
    });

    parser.parse(`go ${destination}`);

    expect(actualDestination).toBe(destination);
  });
});
