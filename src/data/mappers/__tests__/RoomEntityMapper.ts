import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { RoomEntityMapper } from '../RoomEntityMapper';

describe('RoomEntityMapper', () => {
  it('should map RoomEntity to RoomData', () => {
    const mapper = new RoomEntityMapper();

    const roomEntity = createRoomEntityMock();

    const roomData = mapper.fromEntityToData(roomEntity);

    expect(roomData.id).toBe(roomEntity.id);
    expect(roomData.gameId).toBe(roomEntity.gameId);
    expect(roomData.description).toBe(roomEntity.description);
    expect(roomData.name).toBe(roomEntity.name);
  });
});
