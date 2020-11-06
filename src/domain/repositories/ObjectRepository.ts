import { ObjectEntity } from '../entities/ObjectEntity';
import { DeferredNullable } from '../utils/DeferredNullable';

export interface ObjectRepository {
  createObject(roomId: string, dto: ObjectEntity): Promise<void>;
  updateObjectAttribute(
    roomId: string,
    objectId: string,
    dto: UpdateAttributeDto,
  ): Promise<void>;

  getRoomObject(
    roomId: string,
    objectId: string,
  ): DeferredNullable<ObjectEntity>;

  getObjectsFromRooms(
    roomIds: string[],
    objectIds: string[],
  ): Promise<ObjectEntity[]>;
}

export type UpdateAttributeDto = {
  [k: string]: number;
};
