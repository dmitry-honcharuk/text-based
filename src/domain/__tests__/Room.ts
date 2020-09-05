import { createRandomDirection, createRandomRoom } from './utils/random.util';

import { Room } from '../Room';
import { Direction } from '../Direction';

describe('Room', () => {
  let direction: Direction, lobby: Room, hallway: Room;

  beforeEach(() => {
    direction = createRandomDirection();
    lobby = createRandomRoom();
    hallway = createRandomRoom();
  });

  it('should return TRUE if pathway was added', () => {
    expect(lobby.link(hallway, direction)).toBe(true);
  });

  it('should return FALSE if pathway is taken', () => {
    lobby.link(hallway, direction);

    expect(lobby.link(createRandomRoom(), direction)).toBe(false);
  });

  it('should have proper number of exits', () => {
    expect(lobby.exits).toHaveLength(0);

    lobby.link(createRandomRoom(), createRandomDirection());
    lobby.link(createRandomRoom(), createRandomDirection());
    lobby.link(createRandomRoom(), createRandomDirection());
    lobby.link(createRandomRoom(), createRandomDirection());

    expect(lobby.exits).toHaveLength(4);
  });

  it('should tell if room has an exit in given direction', () => {
    expect(lobby.hasExitInDirection(direction)).toBe(false);
    lobby.link(hallway, direction);
    expect(lobby.hasExitInDirection(direction)).toBe(true);
  });

  it('should return a destination along a direction', () => {
    expect(lobby.getDestination(direction.id)).toBeNull();
    lobby.link(hallway, direction);
    expect(lobby.getDestination(direction.id)).toBe(hallway);
  });
});
