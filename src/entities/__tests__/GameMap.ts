import {
  createRandomRoom,
  createRandomPlayer,
  createRandomDirection,
} from './utils/random.util';

import { Player } from '../Player';
import { Room } from '../Room';
import { GameMap } from '../GameMap';

describe('GameMap', () => {
  let player: Player, room: Room, map: GameMap;

  beforeEach(() => {
    player = createRandomPlayer();
    room = createRandomRoom();
    map = new GameMap(room);
  });

  it('should place a player', () => {
    expect(map.playersNumber).toBe(0);

    map.spawnPlayer(player);

    expect(map.playersNumber).toBe(1);
  });

  it('should return NULL for possible player directions if player WAS NOT spawned', () => {
    expect(map.getPlayerPossibleDirections(player)).toBeNull();
  });

  it('should return 0 for possible player directions if player WAS spawned', () => {
    map.spawnPlayer(player);
    expect(map.getPlayerPossibleDirections(player)).toHaveLength(0);
  });

  it('should return number of linked rooms for possible player directions if room was linked to other rooms', () => {
    const direction1 = createRandomDirection();
    const direction2 = createRandomDirection();
    const direction3 = createRandomDirection();

    const linkedRoom1 = createRandomRoom();
    const linkedRoom2 = createRandomRoom();
    const linkedRoom3 = createRandomRoom();

    map.spawnPlayer(player);

    room.link(linkedRoom1, direction1);
    room.link(linkedRoom2, direction2);
    room.link(linkedRoom3, direction3);

    expect(map.getPlayerPossibleDirections(player)).toHaveLength(3);
  });

  it('should move player along direction', () => {
    const direction = createRandomDirection();
    map.spawnPlayer(player);

    expect(map.movePlayer(player, direction)).toBe(false);

    room.link(createRandomRoom(), direction);

    expect(map.movePlayer(player, direction)).toBe(true);
  });
});
