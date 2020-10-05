import { createGameDataMock } from '../../entities/__tests__/utils/mocks';
import { GameDataEntityMapper } from '../GameDataEntityMapper';

describe('GameDataEntityMapper', () => {
  it('should map GameData to GameEntity', () => {
    const gameDataEntityMapper = new GameDataEntityMapper();

    const gameData = createGameDataMock();

    const gameEntity = gameDataEntityMapper.map(gameData);

    expect(gameEntity.id).toBe(gameData.id);
    expect(gameEntity.isStarted).toBe(gameData.isStarted);
  });

  it('should map started GameData to GameEntity', () => {
    const gameDataEntityMapper = new GameDataEntityMapper();

    const gameData = createGameDataMock({ isStarted: true });

    const gameEntity = gameDataEntityMapper.map(gameData);

    expect(gameEntity.isStarted).toBe(true);
  });
});
