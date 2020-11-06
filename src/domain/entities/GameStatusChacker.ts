import { ConditionChecker } from './ConditionChecker';
import { GameEntity, GameStatus } from './GameEntity';
import { ObjectEntity } from './ObjectEntity';

export class GameStatusChecker {
  constructor(private conditionChecker: ConditionChecker) {}

  getNewStatus(game: GameEntity, objects: ObjectEntity[]): GameStatus {
    if (
      this.conditionChecker.isAnyConditionMet(
        game.options.winConditions,
        objects,
      )
    ) {
      return GameStatus.Won;
    }

    if (
      this.conditionChecker.isAnyConditionMet(
        game.options.looseConditions,
        objects,
      )
    ) {
      return GameStatus.Lost;
    }

    return game.status;
  }
}
