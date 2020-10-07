import { random } from 'faker';
import { PlayerEntity } from '../PlayerEntity';

describe('PlayerEntity', () => {
  it('should properly instantiate instace', () => {
    const id = random.word();
    const name = random.word();

    const player = new PlayerEntity({
      id,
      name,
    });

    expect(player.id).toBe(id);
    expect(player.name).toBe(name);
  });
});
