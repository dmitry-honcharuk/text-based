import { random } from 'faker';
import { GameData } from '../GameData';

describe('GameData entity', () => {
  it('should properly initiate entity', () => {
    const id = random.word();

    const gameData = new GameData({
      id,
    });

    expect(gameData.id).toBe(id);
    expect(gameData.isStarted).toBe(false);

    gameData.isStarted = true;

    expect(gameData.isStarted).toBe(true);
  });
});
