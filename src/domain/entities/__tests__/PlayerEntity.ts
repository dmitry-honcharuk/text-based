import { random } from 'faker';
import { PlayerEntity } from '../PlayerEntity';

describe('PlayerEntity', () => {
  it('should properly instantiate instace', () => {
    const name = random.word();

    const player = new PlayerEntity({ name });

    expect(player.name).toBe(name);
  });
});
