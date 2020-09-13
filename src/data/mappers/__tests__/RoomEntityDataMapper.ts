import { createRoomEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { RoomEntityDataMapper } from '../RoomEntityDataMapper';

describe('RoomEntityDataMapper', () => {
  it('should map RoomEntity to RoomData', () => {
    const roomEntityDataMapper = new RoomEntityDataMapper();

    const roomEntity = createRoomEntityMock();

    const roomData = roomEntityDataMapper.map(roomEntity);

    expect(roomData.id).toBe(roomEntity.id);
    expect(roomData.gameId).toBe(roomEntity.gameId);
    expect(roomData.description).toBe(roomEntity.description);
    expect(roomData.name).toBe(roomEntity.name);
  });
});
