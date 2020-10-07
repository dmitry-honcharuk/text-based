import { NextFunction, Request, Response } from 'express';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { PlayerRepository } from '../../../domain/repositories/PlayerRepository';
import { StartGameUseCase } from '../../../domain/usecases/StartGameUseCase';

export type Dependencies = {
  gameRepository: GameRepository;
  playerRepository: PlayerRepository;
};

export function buildStartGameRoute({
  gameRepository,
  playerRepository,
}: Dependencies) {
  return async function startGameRoute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const {
      params: { gameId },
      body: { playerName },
    } = req;

    try {
      const startGameUseCase = new StartGameUseCase(
        gameRepository,
        playerRepository,
      );

      await startGameUseCase.execute({ gameId, playerName });

      return res.json({});
    } catch (e) {
      return next(e);
    }
  };
}
