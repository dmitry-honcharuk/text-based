import { random } from 'faker';
import { GameData } from '../GameData';

describe('GameData entity', () => {
  it('should properly initiate entity', () => {
    const id = random.word();

    const gameData = new GameData({
      id,
    });

    expect(gameData.id).toBe(id);
  });
});
