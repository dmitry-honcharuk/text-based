import { random } from 'faker';

import {
  createRandomDirection,
  createRandomRoom,
  createRandomNpc,
} from './utils/random.util';

import { Room } from '../Room';
import { Direction } from '../Direction';

describe('Room', () => {
  let direction: Direction, lobby: Room, hallway: Room;

  beforeEach(() => {
    direction = createRandomDirection();
    lobby = createRandomRoom();
    hallway = createRandomRoom();
  });

  it('should properly initiate instance', () => {
    const id = random.word();
    const name = random.word();
    const description = random.words();

    const room = new Room({
      id,
      name,
      description,
    });

    expect(room.id).toBe(id);
    expect(room.name).toBe(name);
    expect(room.description).toBe(description);
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

  it('should properly add an npc', () => {
    const npc = createRandomNpc();
    lobby.addNpc(npc);

    expect(lobby.npc.has(npc)).toBe(true);
  });
});
