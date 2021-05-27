import { EffectType } from '../Effects/EffectType';
import {
  EffectTrigger,
  EffectTriggerCondition,
} from '../entities/EffectTrigger';
import { ObjectEntity } from '../entities/ObjectEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface CommandRepository {
  addGlobalCommand(dto: AddCommand): Promise<void>;
  addRoomCommand(dto: AddRoomCommandDto): Promise<void>;

  getGlobalEffect(dto: GetCommand): DeferredNullable<EffectType>;
  getRoomEffects(
    dto: GetRoomEffectRequestDto,
  ): Promise<GetRoomEffectResponseDto>;
}

export type AddCommand = {
  gameId: string;
  command: string | string[];
  effect: EffectType;
  roomId?: string;
};

export type GetCommand = {
  gameId: string;
  command: string;
};

export type AddRoomCommandDto = {
  roomId: string;
  object: ObjectEntity;
  command: string;
  conditions: EffectTriggerCondition[];
  effectTriggers: EffectTrigger[];
};

export type GetRoomEffectRequestDto = { roomId: string; command: string };
export type GetRoomEffectResponseDto = Array<{
  effectType: EffectType;
  object: ObjectEntity;
  context: any;
  conditions: EffectTriggerCondition[];
}>;
