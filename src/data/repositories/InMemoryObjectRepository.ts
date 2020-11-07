import { ObjectEntity } from '../../domain/entities/ObjectEntity';
import {
  ObjectRepository,
  UpdateAttributeDto,
} from '../../domain/repositories/ObjectRepository';
import { DeferredNullable } from '../../domain/utils/DeferredNullable';

export class InMemoryObjectRepository implements ObjectRepository {
  public readonly roomObjects: Map<string, ObjectEntity[]> = new Map();

  async createObject(roomId: string, dto: ObjectEntity): Promise<void> {
    const roomObjects = this.roomObjects.get(roomId) ?? [];

    this.roomObjects.set(roomId, [...roomObjects, dto]);
  }

  async updateObjectAttribute(
    roomId: string,
    objectId: string,
    dto: UpdateAttributeDto,
  ): Promise<void> {
    const objects = this.roomObjects.get(roomId);

    if (!objects) return;

    const object = objects.find(({ id }) => id === objectId);

    if (!object) return;

    for (const [name, value] of Object.entries(dto)) {
      object.attributes?.set(name, value);
    }
  }

  async getRoomObject(
    roomId: string,
    objectId: string,
  ): DeferredNullable<ObjectEntity> {
    const roomObjects = this.roomObjects.get(roomId);

    if (!roomObjects) return null;

    return roomObjects.find(({ id }) => objectId === id) ?? null;
  }

  async getObjectsFromRooms(
    roomIds: string[],
    objectIds: string[],
  ): Promise<ObjectEntity[]> {
    return [...this.roomObjects.entries()]
      .filter(([roomId]) => roomIds.includes(roomId))
      .flatMap(([, objects]) => objects)
      .filter(({ id }) => objectIds.includes(id));
  }
}
