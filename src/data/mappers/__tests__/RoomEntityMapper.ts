import { random } from 'faker';
import {
  createRoomEntityExitMock,
  createRoomEntityMock,
} from '../../../domain/entities/__tests__/utils/mocks';
import { createRoomDataMock } from '../../entities/__tests__/utils/mocks';
import { RoomEntityMapper } from '../RoomEntityMapper';

describe('RoomEntityMapper', () => {
  it('should map RoomEntity to RoomData', () => {
    const mapper = new RoomEntityMapper();
    const gameId = random.word();

    const roomEntity = createRoomEntityMock({
      exits: [
        createRoomEntityExitMock(),
        createRoomEntityExitMock(),
        createRoomEntityExitMock(),
      ],
    });

    const roomData = mapper.fromEntityToData(roomEntity, gameId);

    expect(roomData.customId).toBe(roomEntity.id);
    expect(roomData.gameId).toBe(gameId);
    expect(roomData.description).toBe(roomEntity.description);
    expect(roomData.name).toBe(roomEntity.name);
  });

  it('should map RoomData to RoomEntity', () => {
    const expectedRoomData = createRoomDataMock({
      exits: [createRoomEntityExitMock(), createRoomEntityExitMock()],
    });

    const mapper = new RoomEntityMapper();

    const actualEntity = mapper.fromDataToEntity(expectedRoomData);

    expect(actualEntity.id).toBe(expectedRoomData.customId);
    expect(actualEntity.name).toBe(expectedRoomData.name);
    expect(actualEntity.description).toBe(expectedRoomData.description);
    expect(actualEntity.exits).toBe(expectedRoomData.exits);
  });
});
