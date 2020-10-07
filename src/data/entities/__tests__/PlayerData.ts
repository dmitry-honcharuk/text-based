import { random } from 'faker';
import { PlayerData } from '../PlayerData';

describe('PlayerData', () => {
  it('should properly instantiate instace', () => {
    const id = random.word();
    const name = random.word();
    const gameId = random.word();

    const player = new PlayerData({
      id,
      name,
      gameId,
    });

    expect(player.id).toBe(id);
    expect(player.name).toBe(name);
    expect(player.gameId).toBe(gameId);
  });
});
