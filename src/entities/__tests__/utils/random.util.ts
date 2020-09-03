import { random, name } from 'faker';

import { Room } from '../../Room';
import { Player } from '../../Player';
import { Direction } from '../../Direction';
import { Game } from '../../Game';
import { GameMap } from '../../GameMap';

export function createRandomPlayer() {
  return new Player({
    name: name.firstName(),
  });
}

export function createRandomRoom() {
  return new Room({
    id: random.uuid(),
    name: random.uuid(),
    description: random.words(),
  });
}

export function createRandomDirection() {
  return new Direction({
    id: random.uuid(),
    name: name.firstName(),
  });
}

export function createRandomMap() {
  return new GameMap(createRandomRoom());
}

export function createRandomGame(players: Player[] = []) {
  const game = new Game(createRandomMap());

  if (players.length) {
    for (const player of players) {
      game.addPlayer(player);
    }
  }

  return game;
}
