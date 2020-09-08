import { name, random } from 'faker';

import { Room } from '../../Room';
import { Player, PlayerConfig } from '../../Player';
import { Direction } from '../../Direction';
import { Game } from '../../Game';
import { GameMap } from '../../GameMap';
import { ActionFactory, CommandParser } from '../../../CommandParser';
import { NPC, NPCConfig } from '../../NPC';
import { ActionManager } from '../../ActionManager';

export function createRandomPlayer(config: PlayerConfig = {
  name: name.firstName(),
}) {
  return new Player(config);
}

type RandomRoomConfig = {
  npc?: NPC[];
  exits?: Map<Direction, Room>;
};
export function createRandomRoom(config: RandomRoomConfig = {}) {
  const { npc, exits } = config;

  const room = new Room({
    id: random.uuid(),
    name: random.uuid(),
    description: random.words(),
  });

  if (npc) {
    npc.forEach((n) => room.addNpc(n));
  }

  if (exits) {
    for (const [direction, destination] of exits) {
      room.link(destination, direction);
    }
  }

  return room;
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
  npcConfig: Partial<NPCConfig> = {},
) {
  const { id = random.word(), name: npcName = name.firstName() } = npcConfig;

  return new NPC({
    id,
    name: npcName,
  });
}

export function createRandomActionManager(game: Game = createRandomGame()): ActionManager {
  return new ActionManager(game);
}
