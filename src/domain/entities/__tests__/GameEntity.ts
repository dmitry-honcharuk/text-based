import { GameEntity } from '../GameEntity';
import { createPlayerEntityMock } from './utils/mocks';

describe('GameEntity', () => {
  it('should properly create an instance', () => {
    const gameEntity = new GameEntity({});

    expect(gameEntity.isStarted).toBe(false);
    expect(gameEntity.players).toHaveLength(0);
  });

  it('should properly create an instance with players', () => {
    const expectedPlayers = [
      createPlayerEntityMock(),
      createPlayerEntityMock(),
      createPlayerEntityMock(),
    ];

    const gameEntity = new GameEntity({ players: expectedPlayers });

    expect(gameEntity.players).toEqual(expectedPlayers);
  });
});
