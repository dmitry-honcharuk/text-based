import { Game } from '../domain/Game';

import { PlayerExistsError } from './Errors/PlayerExistsError';
import { Player } from '../domain/Player';
import { Factory } from '../utils/Factory';

interface Dependencies {
  game: Game;
}

interface AddPlayerConfig {
  name: string;
}

export type AddPlayer = Factory<void, AddPlayerConfig>;

export function makeAddPlayer(dependencies: Dependencies): AddPlayer {
  const { game } = dependencies;

  return function addPlayer(config: AddPlayerConfig): void {
    if (game.hasPlayer(config.name)) {
      throw new PlayerExistsError(config.name);
    }

    game.addPlayer(new Player({ name: config.name }));
  };
}
