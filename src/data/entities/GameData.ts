import { GameOptions, GameStatus } from '../../domain/entities/GameEntity';

export type GameData = {
  id: string;
  status: GameStatus;
  options: GameOptions;
};
