export interface Factory<R, U> {
  (config?: U): R;
}
