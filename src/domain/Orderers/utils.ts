import { randomInt } from 'crypto';

type ItemWithInitiative<T = any> = [initiative: number, item: T];
type Options = {
  maxInitiative: number;
  initiativeWeight?: number;
};

export function getInitiativePair<T = any>(
  item: T,
  options: Options,
): ItemWithInitiative<T> {
  const { maxInitiative, initiativeWeight = 0 } = options;

  return [randomInt(maxInitiative) + initiativeWeight, item];
}
