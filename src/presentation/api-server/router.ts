import { Router } from 'express';
import { createRouter as createGameRouter, RouterDependencies as GameRouterDependencies, } from './games';
import { errorHandler } from './errorHandler';

type Dependencies = GameRouterDependencies;

export function createRouter(dependencies: Dependencies) {
  const router = Router();

  router.use('/games', createGameRouter(dependencies));

  router.use(errorHandler);

  return router;
}
