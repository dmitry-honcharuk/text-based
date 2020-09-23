import { NextFunction, Request, Response } from 'express';

import { GameConfigValidator } from '../../../domain/entities/GameConfigValidator';
import { GameRepository } from '../../../domain/repositories/GameRepository';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';
import { CreateGameUseCase } from '../../../domain/usecases/CreateGameUseCase';

export type Dependencies = {
  roomRepository: RoomRepository;
  gameRepository: GameRepository;
  gameConfigValidator: GameConfigValidator;
};

export function buildCreateGameRoute({
  roomRepository,
  gameRepository,
  gameConfigValidator,
}: Dependencies) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const createGameUseCase = new CreateGameUseCase(
        roomRepository,
        gameRepository,
        gameConfigValidator,
      );

      const gameId = await createGameUseCase.execute(body);

      return res.json({ id: gameId });
    } catch (e) {
      return next(e);
    }
  };
}
