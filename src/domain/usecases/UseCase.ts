export interface UseCase<InputProps, OutputProps> {
  execute(input: InputProps): OutputProps;
}
