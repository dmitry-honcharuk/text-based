export interface UseCase<T, U> {
  execute(input: T): U;
}
