import { Router } from 'express';

import {
  buildCreateGameRoute,
  Dependencies as CreateGameRoute,
} from './buildCreateGameRoute';

export type Dependencies = CreateGameRoute;

export function createRouter(dependencies: Dependencies) {
  const routes = Router();

  routes.post('/', buildCreateGameRoute(dependencies));

  return routes;
}
