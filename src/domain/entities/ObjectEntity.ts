import { EntityAttributes } from './EntityAttributes';

export type ObjectEntity = {
  id: string;
  name: string;
  attributes?: EntityAttributes;
};
