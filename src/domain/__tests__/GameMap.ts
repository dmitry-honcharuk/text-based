import {
  createRandomRoom,
  createRandomPlayer,
  createRandomDirection,
} from './utils/random.util';

import { Player } from '../Player';
import { Room } from '../Room';
import { GameMap } from '../GameMap';

describe('GameMap', () => {
  let player: Player, lobby: Room, map: GameMap;

  beforeEach(() => {
    player = createRandomPlayer();
    lobby = createRandomRoom();
    map = new GameMap(lobby);
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

    lobby.link(linkedRoom1, direction1);
    lobby.link(linkedRoom2, direction2);
    lobby.link(linkedRoom3, direction3);

    expect(map.getPlayerPossibleDirections(player)).toHaveLength(3);
  });

  it('should set player location', () => {
    const hallway = createRandomRoom();

    map.spawnPlayer(player);

    expect(map.getPlayerLocation(player)).toBe(lobby);

    map.setPLayerLocation(player, hallway);

    expect(map.getPlayerLocation(player)).toBe(hallway);
  });
});
