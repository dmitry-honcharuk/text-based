import { DomainError } from './DomainError';

export class NoSuchPlayerError extends DomainError {
  constructor(playerName: string) {
    super(`No such player. (${playerName})`);
  }
}
