import { DomainError } from './DomainError';

export class WrongAttackTargetError extends DomainError {
  constructor(target: string) {
    super(`Wrong attack target. ${target}`);
  }
}
