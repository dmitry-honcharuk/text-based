import { Router, Request, Response } from 'express';

import { CreateGameUseCase } from '../../../domain/usecases/CreateGameUseCase';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { GameConfigValidator } from '../../../domain/entities/GameConfigValidator';

export type Dependencies = {
  roomRepository: RoomRepository;
  gameRepository: GameRepository;
  gameConfigValidator: GameConfigValidator;
};

export function createRouter(dependencies: Dependencies) {
  const routes = Router();

  routes.post('/', createGame(dependencies));

  return routes;
}

function createGame({
  roomRepository,
  gameRepository,
  gameConfigValidator,
}: Dependencies) {
  return async (req: Request, res: Response) => {
    const { body } = req;

    const createGameUseCase = new CreateGameUseCase(
      roomRepository,
      gameRepository,
      gameConfigValidator,
    );

    const gameId = await createGameUseCase.execute(body);

    return res.json({ id: gameId });
  };
}
