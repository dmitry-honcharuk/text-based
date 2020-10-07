import { IncrementingIdGenerator } from '../IncrementingIdGenerator';

describe('IncrementingIdGenerator', () => {
  it('should generate incrementing numbers as strings', () => {
    const generator = new IncrementingIdGenerator();

    expect(generator.next()).toBe('1');
    expect(generator.next()).toBe('2');
    expect(generator.next()).toBe('3');
    expect(generator.next()).toBe('4');
    expect(generator.next()).toBe('5');
  });
});
