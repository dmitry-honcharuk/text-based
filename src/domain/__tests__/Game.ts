import { createRandomPlayer } from './utils/random.util';

import { Player } from '../Player';
import { Room } from '../Room';
import { GameMap } from '../GameMap';
import { Game } from '../Game';
import { createRandomAction } from '../actions/__tests__/utils/random';

describe('Game', () => {
  let player: Player, room: Room, map: GameMap, game: Game;

  beforeEach(() => {
    player = new Player({ name: 'Player 1' });
    room = new Room({
      id: 'lobby',
      name: 'Lobby',
      description: 'Sad emtpy lobby',
    });
    map = new GameMap(room);
    game = new Game(map);
  });

  it('should not be started initially', () => {
    expect(game.isStarted).toBe(false);
  });

  it('should not start without players', () => {
    expect(game.start()).toBe(false);
  });

  it('should start with a player added', () => {
    game.addPlayer(player);
    expect(game.start()).toBe(true);
    expect(game.isStarted).toBe(true);
  });

  it('should not start if already was started', () => {
    game.addPlayer(player);
    expect(game.start()).toBe(true);
    expect(game.start()).toBe(false);
    expect(game.isStarted).toBe(true);
  });

  it('should return player names', () => {
    const player1 = createRandomPlayer();
    const player2 = createRandomPlayer();

    expect(game.playerNames).toHaveLength(0);

    game.addPlayer(player1);
    game.addPlayer(player2);

    expect(game.playerNames).toEqual([player1.name, player2.name]);
  });

  it('should apply all given actions on turns end', () => {
    let count = 0;
    const action1 = createRandomAction({}, () => {
      count++;
      return true;
    });

    game.registerAction(action1);

    game.applyActions();

    expect(count).toBe(1);
  });
});
