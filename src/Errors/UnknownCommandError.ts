import { DomainError } from './DomainError';

export class UnknownCommandError extends DomainError {
  constructor(commandName: string) {
    super(`Unknown command. (${commandName})`);
  }
}
