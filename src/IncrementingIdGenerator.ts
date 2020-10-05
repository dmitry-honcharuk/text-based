import { IdGenerator } from './data/entities/IdGenerator';

export class IncrementingIdGenerator implements IdGenerator {
  private current = 1;

  next(): string {
    return `${this.current++}`;
  }
}
