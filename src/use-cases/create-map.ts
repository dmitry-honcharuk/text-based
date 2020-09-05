import { Room } from '../domain/Room';
import { Direction } from '../domain/Direction';
import { GameMap } from '../domain/GameMap';
import { Factory } from '../utils/Factory';

type RoomId = string;

export interface MapConfig {
  startingRoom: RoomId;
  rooms: RoomConfig[];
}

interface RoomExit {
  id: string;
  name: string;
  destination: RoomId;
}

interface RoomConfig {
  id: RoomId;
  name: string;
  description: string;
  exits?: RoomExit[];
}

type RoomsMap = Map<string, Room>;

export type CreateMapFactory = Factory<GameMap, MapConfig>;

export function makeCreateMap(): CreateMapFactory {
  return function createMap(mapConfig: MapConfig): GameMap {
    const rooms = buildRooms(mapConfig.rooms);

    linkRooms(rooms, mapConfig.rooms);

    const startingRoom = rooms.get(mapConfig.startingRoom);

    if (!startingRoom) {
      throw new Error('No starting room configuration');
    }

    return new GameMap(startingRoom);
  };
}

function buildRooms(roomConfigs: RoomConfig[]): RoomsMap {
  const rooms: RoomsMap = new Map();

  for (const config of roomConfigs) {
    rooms.set(config.id, new Room(config));
  }

  return rooms;
}

function linkRooms(rooms: RoomsMap, roomConfigs: RoomConfig[]) {
  for (const config of roomConfigs) {
    const room = rooms.get(config.id);

    for (const exit of config.exits ?? []) {
      const destination = rooms.get(exit.destination);

      if (!destination) {
        throw new Error(`No exit room configuration (${exit.destination})`);
      }

      room?.link(destination, new Direction(exit));
    }
  }
}
