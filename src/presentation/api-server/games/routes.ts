import { Router } from 'express';
import {
  buildCreateGameRoute,
  Dependencies as CreateGameRoute,
} from './buildCreateGameRoute';
import {
  buildStartGameRoute,
  Dependencies as StartGameRoute,
  validateStartGameRoute,
} from './buildStartGameRoute';

export type Dependencies = CreateGameRoute & StartGameRoute;

export function createRouter(dependencies: Dependencies) {
  const routes = Router();

  routes.post('/', buildCreateGameRoute(dependencies));
  routes.post(
    '/:gameId/start',
    validateStartGameRoute(),
    buildStartGameRoute(dependencies)
  );

  return routes;
}
