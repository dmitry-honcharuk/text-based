import { EntityAttributes } from './EntityAttributes';

export type ObjectEntity = {
  id: string;
  name: string;
  aliases?: string[];
  attributes?: EntityAttributes;
};
