export interface Orderer {
  order<T = any>(items: T[]): T[];
}
