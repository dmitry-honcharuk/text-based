import { random } from 'faker';
import { GameEntity } from '../GameEntity';
import { createPlayerEntityMock } from './utils/mocks';

describe('GameEntity', () => {
  it('should properly create an instance', () => {
    const id = random.word();
    const gameEntity = new GameEntity({ id });

    expect(gameEntity.id).toBe(id);
    expect(gameEntity.isStarted).toBe(false);
    expect(gameEntity.players).toHaveLength(0);
  });

  it('should properly create an instance with players', () => {
    const id = random.word();
    const expectedPlayers = [
      createPlayerEntityMock(),
      createPlayerEntityMock(),
      createPlayerEntityMock(),
    ];

    const gameEntity = new GameEntity({ id, players: expectedPlayers });

    expect(gameEntity.players).toEqual(expectedPlayers);
  });
});
