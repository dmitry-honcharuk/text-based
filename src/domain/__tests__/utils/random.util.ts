import { random, name } from 'faker';

import { Room } from '../../Room';
import { Player } from '../../Player';
import { Direction } from '../../Direction';
import { Game } from '../../Game';
import { GameMap } from '../../GameMap';
import { CommandParser, ActionFactory } from '../../../CommandParser';
import { NPCConfig, NPC } from '../../NPC';

export function createRandomPlayer({
  name: playerName = name.firstName(),
} = {}) {
  return new Player({
    name: playerName,
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

export function createRandomMap(room: Room = createRandomRoom()) {
  return new GameMap(room);
}

export function createRandomGame(
  players: Player[] = [],
  map = createRandomMap(),
) {
  const game = new Game(map);

  if (players.length) {
    for (const player of players) {
      game.addPlayer(player);
    }
  }

  return game;
}

export function createRandomCommandParser(
  commands?: Map<string, ActionFactory>,
) {
  const parser = new CommandParser();

  if (commands) {
    for (const [command, factory] of commands) {
      parser.registerCommand(command, factory);
    }
  }

  return parser;
}

export function createRandomNpc(
  npcConfig: NPCConfig = { id: random.word(), name: name.firstName() },
) {
  return new NPC(npcConfig);
}
