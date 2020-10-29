import { EffectType } from '../Effects/EffectType';
import { DeferredNullable } from '../utils/DeferredNullable';

export type AddCommand = {
  gameId: string;
  command: string;
  effect: EffectType;
  roomId?: string;
};

export type GetCommand = {
  gameId: string;
  command: string;
};

export interface CommandRepository {
  addCommand(dto: AddCommand): Promise<void>;

  getEffect(dto: GetCommand): DeferredNullable<EffectType>;
}
