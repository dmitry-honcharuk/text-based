import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { MapRepository } from '../../../domain/repositories/MapRepository';
import { PlayerRepository } from '../../../domain/repositories/PlayerRepository';
import { StartGameUseCase } from '../../../domain/usecases/StartGameUseCase';
import validate from '../validate';

export type Dependencies = {
  gameRepository: GameRepository;
  playerRepository: PlayerRepository;
  mapRepository: MapRepository;
};

// @TODO test validator
export function buildStartGameRoute({
  gameRepository,
  playerRepository,
  mapRepository,
}: Dependencies) {
  return async function startGameRoute(
    req: Request<{ gameId: string }, {}, { playerName: string }>,
    res: Response,
    next: NextFunction
  ) {
    const {
      params: { gameId },
      body: { playerName },
    } = req;

    try {
      const startGameUseCase = new StartGameUseCase(
        gameRepository,
        playerRepository,
        mapRepository
      );

      const playerId = await startGameUseCase.execute({ gameId, playerName });

      return res.json({ playerId });
    } catch (e) {
      return next(e);
    }
  };
}

export function validateStartGameRoute() {
  return [
    body('playerName')
      .exists()
      .withMessage('required')
      .notEmpty()
      .withMessage('required'),
    validate,
  ];
}
