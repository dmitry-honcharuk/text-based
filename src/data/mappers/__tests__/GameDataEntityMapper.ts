import { createPlayerEntityMock } from '../../../domain/entities/__tests__/utils/mocks';
import { createGameDataMock } from '../../entities/__tests__/utils/mocks';
import { GameDataEntityMapper } from '../GameDataEntityMapper';

describe('GameDataEntityMapper', () => {
  it('should map GameData to GameEntity', () => {
    const gameDataEntityMapper = new GameDataEntityMapper();

    const gameData = createGameDataMock();

    const gameEntity = gameDataEntityMapper.map(gameData);

    expect(gameEntity.id).toBe(gameData.id);
    expect(gameEntity.isStarted).toBe(gameData.isStarted);
    expect(gameEntity.players).toHaveLength(0);
  });

  it('should map started GameData to GameEntity', () => {
    const gameDataEntityMapper = new GameDataEntityMapper();

    const gameData = createGameDataMock({ isStarted: true });

    const gameEntity = gameDataEntityMapper.map(gameData);

    expect(gameEntity.isStarted).toBe(true);
  });

  it('should map GameData to GameEntity with Players', () => {
    const gameDataEntityMapper = new GameDataEntityMapper();

    const expectedPlayers = [
      createPlayerEntityMock(),
      createPlayerEntityMock(),
      createPlayerEntityMock(),
    ];

    const gameData = createGameDataMock();

    const gameEntity = gameDataEntityMapper.map(gameData, expectedPlayers);

    expect(gameEntity.players).toEqual(expectedPlayers);
  });
});
