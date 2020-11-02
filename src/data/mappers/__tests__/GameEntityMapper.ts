import {
  createEntityAttributesMock,
  createPlayerEntityMock,
} from '../../../domain/entities/__tests__/utils/mocks';
import { createGameDataMock } from '../../entities/__tests__/utils/mocks';
import { GameEntityMapper } from '../GameEntityMapper';

describe('GameEntityMapper', () => {
  it('should map GameData to GameEntity', () => {
    const mapper = new GameEntityMapper();

    const gameData = createGameDataMock();

    const gameEntity = mapper.fromDataToEntity(
      gameData,
      [],
      createEntityAttributesMock(),
    );

    expect(gameEntity.isStarted).toBe(gameData.isStarted);
    expect(gameEntity.players).toHaveLength(0);
  });

  it('should map started GameData to GameEntity', () => {
    const mapper = new GameEntityMapper();

    const gameData = createGameDataMock({ isStarted: true });

    const gameEntity = mapper.fromDataToEntity(
      gameData,
      [],
      createEntityAttributesMock(),
    );

    expect(gameEntity.isStarted).toBe(true);
  });

  it('should map GameData to GameEntity with Players', () => {
    const mapper = new GameEntityMapper();

    const expectedPlayers = [
      createPlayerEntityMock(),
      createPlayerEntityMock(),
      createPlayerEntityMock(),
    ];

    const gameData = createGameDataMock();

    const gameEntity = mapper.fromDataToEntity(
      gameData,
      expectedPlayers,
      createEntityAttributesMock(),
    );

    expect(gameEntity.players).toEqual(expectedPlayers);
  });
});
