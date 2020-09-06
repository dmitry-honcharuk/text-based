import { DomainError } from './DomainError';

export class GameIsNotStartedError extends DomainError {
  constructor() {
    super('Game is not started yet.');
  }
}
