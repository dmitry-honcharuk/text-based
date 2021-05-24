import { Orderer } from './Orderer';
import { getInitiativePair } from './utils';

export class RandomTurnOrderer implements Orderer {
  order<T = any>(items: T[]): T[] {
    return [...items]
      .map((item) => getInitiativePair(item, { maxInitiative: items.length }))
      .sort(([initiativeA], [initiativeB]) => initiativeB - initiativeA)
      .map(([, item]) => item);
  }
}
