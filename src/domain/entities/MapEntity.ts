import { RoomEntity } from './RoomEntity';

export class MapEntity {
  constructor(private _startingRoom: RoomEntity) {}

  get startingRoom(): RoomEntity {
    return this._startingRoom;
  }
}
