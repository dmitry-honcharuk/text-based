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
      description: 'Sad empty lobby',
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
    const action2 = createRandomAction({}, () => {
      count++;
      return true;
    });
    const action3 = createRandomAction({}, () => {
      count++;
      return true;
    });

    game.registerAction(action1, player);
    game.registerAction(action2, player);
    game.registerAction(action3, player);

    game.applyActions();

    expect(count).toBe(3);
  });

  it('should check if player with given name exists', () => {
    const player1 = createRandomPlayer({ name: 'Player 1' });

    expect(game.hasPlayer(player1.name)).toBe(false);

    game.addPlayer(player1);

    expect(game.hasPlayer(player1.name)).toBe(true);
  });

  it('should retrieve player by name', () => {
    expect(game.getPlayer(player.name)).toBeNull();

    game.addPlayer(player);

    expect(game.getPlayer(player.name)).toBe(player);
  });

  it('should retrieve number of players', () => {
    expect(game.playersNumber).toBe(0);

    game.addPlayer(player);

    expect(game.playersNumber).toBe(1);

    game.addPlayer(createRandomPlayer());

    expect(game.playersNumber).toBe(2);
  });
});
