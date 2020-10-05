import { Router } from 'express';
import {
  buildCreateGameRoute,
  Dependencies as CreateGameRoute,
} from './buildCreateGameRoute';
import {
  buildStartGameRoute,
  Dependencies as StartGameRoute,
} from './buildStartGameRoute';

export type Dependencies = CreateGameRoute & StartGameRoute;

export function createRouter(dependencies: Dependencies) {
  const routes = Router();

  routes.post('/', buildCreateGameRoute(dependencies));
  routes.post('/:gameId/start', buildStartGameRoute(dependencies));

  return routes;
}
