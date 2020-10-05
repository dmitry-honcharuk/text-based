import { random } from 'faker';
import { GameEntity } from '../GameEntity';

describe('GameEntity', () => {
  it('should properly create an instance', () => {
    const id = random.word();
    const gameEntity = new GameEntity({ id });

    expect(gameEntity.id).toBe(id);
    expect(gameEntity.isStarted).toBe(false);
  });
});
