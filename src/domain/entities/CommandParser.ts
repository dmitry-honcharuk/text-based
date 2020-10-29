export class CommandParser {
  parse(input: string): [command: string, possibleTargets: string[]] {
    const [command, ...rest] = input
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => !!s);

    const possibleTargets = rest.map((_, index) =>
      rest.slice(index, rest.length).join(' '),
    );

    return [command, possibleTargets];
  }
}
