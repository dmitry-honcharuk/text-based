export abstract class EntityMapper<T, U> {
  abstract map(entity: T): U;
}
