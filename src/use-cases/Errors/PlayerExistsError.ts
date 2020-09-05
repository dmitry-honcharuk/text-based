import { DomainError } from './DomainError';

export class PlayerExistsError extends DomainError {
  constructor(name: string) {
    super(`Player with given name already plays the game. (${name})`);
  }
}
