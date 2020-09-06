import { DomainError } from './DomainError';

export class NoPlayersError extends DomainError {
  constructor() {
    super('There are no players in the game yet.');
  }
}
