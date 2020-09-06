import { Game } from '../../domain/Game';
import { Player } from '../../domain/Player';
import { createRandomGame, createRandomPlayer } from '../../domain/__tests__/utils/random.util';
import { makeStartGame } from '../start-game';
import { NoPlayersError } from '../../Errors/NoPlayersError';

describe('Start game use case', () => {
  let game: Game, player: Player;

  beforeEach(() => {
    game = createRandomGame();
    player = createRandomPlayer();
  });

  it('should throw an error if there are no players in the game', () => {
    const startGame = makeStartGame({ game });

    expect(() => {
      startGame();
    }).toThrowError(new NoPlayersError());
  });

  it('should start the game successfully', () => {
    const startGame = makeStartGame({ game });

    expect(game.isStarted).toBe(false);

    game.addPlayer(player);

    expect(() => {
      startGame();
    }).not.toThrowError(new NoPlayersError());

    expect(game.isStarted).toBe(true);
  });
})
