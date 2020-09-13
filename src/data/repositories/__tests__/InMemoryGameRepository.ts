import { InMemoryGameRepository } from '../InMemoryGameRepository';
import { random } from 'faker';
import { GameEntity } from '../../../domain/entities/GameEntity';

describe('InMemoryGameRepository', () => {
  it('should create a game', async () => {
    const mappingResult = random.word();
    const mapper = {
      map: jest.fn(() => (mappingResult as unknown) as GameEntity),
    };
    const gameRepository = new InMemoryGameRepository(mapper);

    expect(gameRepository.games).toHaveLength(0);

    const game = await gameRepository.createGame();

    expect(game).toBe(mappingResult);

    expect(gameRepository.games).toHaveLength(1);
  });
});
