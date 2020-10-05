import { NextFunction, Request, Response } from 'express';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { StartGameUseCase } from '../../../domain/usecases/StartGameUseCase';

export type Dependencies = {
  gameRepository: GameRepository;
};

export function buildStartGameRoute({ gameRepository }: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { gameId },
    } = req;

    try {
      const startGameUseCase = new StartGameUseCase(gameRepository);

      await startGameUseCase.execute({ gameId });

      return res.json({});
    } catch (e) {
      return next(e);
    }
  };
}
