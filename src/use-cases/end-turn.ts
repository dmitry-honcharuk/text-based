import { Game } from '../domain/Game';

interface Dependencies {
  game: Game;
}

export function makeEndTurn(dependencies: Dependencies) {
  const { game } = dependencies;

  return function endTurn() {
    game.applyActions();
  };
}
