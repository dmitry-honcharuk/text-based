import { Router } from 'express';
import {
  createRouter as createGameRouter,
  RouterDependencies as GameRouterDependencies,
} from './games';

type Dependencies = GameRouterDependencies;

export function createRouter(dependencies: Dependencies) {
  const router = Router();

  router.use('/games', createGameRouter(dependencies));

  return router;
}
