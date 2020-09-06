import { Game } from '../domain/Game';
import { NoPlayersError } from '../Errors/NoPlayersError';

interface Dependencies {
  game: Game;
}

export function makeStartGame(dependencies: Dependencies) {
  const { game } = dependencies;

  return function startGame() {
    if (game.playersNumber === 0) {
      throw new NoPlayersError();
    }

    game.start();
  };
}
