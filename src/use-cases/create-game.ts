import { Game } from '../domain/Game';
import { CreateMapFactory, MapConfig } from './create-map';
import { Factory } from '../utils/Factory';

interface CreateGameDependencies {
  createMap: CreateMapFactory;
}

export interface GameConfig {
  map: MapConfig;
}

type CreateGameFactory = Factory<Game, GameConfig>;

export function makeCreateGame(
  dependencies: CreateGameDependencies,
): CreateGameFactory {
  const { createMap } = dependencies;

  return function createGame(config: GameConfig) {
    const map = createMap(config.map);

    return new Game(map);
  };
}
