import { NextFunction, Request, Response } from 'express';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { MapRepository } from '../../../domain/repositories/MapRepository';
import { PlayerRepository } from '../../../domain/repositories/PlayerRepository';
import { StartGameUseCase } from '../../../domain/usecases/StartGameUseCase';

export type Dependencies = {
  gameRepository: GameRepository;
  playerRepository: PlayerRepository;
  mapRepository: MapRepository;
};

export function buildStartGameRoute({
  gameRepository,
  playerRepository,
  mapRepository,
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
        mapRepository,
      );

      await startGameUseCase.execute({ gameId, playerName });

      return res.json({});
    } catch (e) {
      return next(e);
    }
  };
}
