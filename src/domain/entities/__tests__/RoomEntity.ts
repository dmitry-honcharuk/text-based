import { random } from 'faker';
import { RoomEntity } from '../RoomEntity';

describe('RoomEntity', () => {
  it('should properly create an instance', () => {
    const id = random.word();
    const name = random.word();
    const description = random.words();

    const roomEntity = new RoomEntity({
      id,
      name,
      description,
    });

    expect(roomEntity.id).toBe(id);
    expect(roomEntity.name).toBe(name);
    expect(roomEntity.description).toBe(description);
  });
});
