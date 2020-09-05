import { name } from 'faker';

import { createRandomGame } from '../../domain/__tests__/utils/random.util';
import { Game } from '../../domain/Game';
import { makeAddPlayer, AddPlayer } from '../add-player';
import { PlayerExistsError } from '../../Errors/PlayerExistsError';

describe('Add player', () => {
  let game: Game, addPlayer: AddPlayer;

  beforeEach(() => {
    game = createRandomGame();
    addPlayer = makeAddPlayer({ game });
  });

  it('should properly add a player to the game', () => {
    const playerName = name.firstName();

    addPlayer({ name: playerName });

    expect(game.hasPlayer(playerName)).toBe(true);
  });

  it('should throw when trying to add an existing user', () => {
    const playerName = name.firstName();

    addPlayer({ name: playerName });

    expect(() => {
      addPlayer({ name: playerName });
    }).toThrowError(new PlayerExistsError(playerName));
  });
});
