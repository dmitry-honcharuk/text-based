import { createRandomDirection } from './utils/random.util';

import { Direction } from '../Direction';

describe('Direction', () => {
  let direction: Direction;

  beforeEach(() => {
    direction = createRandomDirection();
  });

  it('should hold given name and id', () => {
    const id = 'south';
    const name = 'South';
    const south = new Direction({ id, name });

    expect(south.id).toBe(id);
    expect(south.name).toBe(name);
  });

  it('should check if given direction is same', () => {
    expect(direction.isSameDirection(direction)).toBe(true);
    expect(direction.isSameDirection(createRandomDirection())).toBe(false);
  });
});
