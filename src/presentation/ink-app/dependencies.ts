import { GameEntityMapper } from '../../data/mappers/GameEntityMapper';
import { PlayerEntityMapper } from '../../data/mappers/PlayerEntityMapper';
import { RoomEntityMapper } from '../../data/mappers/RoomEntityMapper';
import { InMemoryCommandRepository } from '../../data/repositories/InMemoryCommandRepository';
import { InMemoryGameRepository } from '../../data/repositories/InMemoryGameRepository';
import { InMemoryMapRepository } from '../../data/repositories/InMemoryMapRepository';
import { InMemoryObjectRepository } from '../../data/repositories/InMemoryObjectRepository';
import { InMemoryPlayerRepository } from '../../data/repositories/InMemoryPlayerRepository';
import { InMemoryRoomRepository } from '../../data/repositories/InMemoryRoomRepository';
import { IncrementingIdGenerator } from '../../IncrementingIdGenerator';

export const roomRepo = new InMemoryRoomRepository(
  new RoomEntityMapper(),
  new IncrementingIdGenerator(),
);

export const playerRepo = new InMemoryPlayerRepository(
  new IncrementingIdGenerator(),
  new PlayerEntityMapper(),
);

export const gameRepo = new InMemoryGameRepository(
  new GameEntityMapper(),
  new IncrementingIdGenerator(),
  playerRepo,
);

export const mapRepo = new InMemoryMapRepository(
  new IncrementingIdGenerator(),
  roomRepo,
);

export const objectRepo = new InMemoryObjectRepository();

export const commandRepo = new InMemoryCommandRepository(objectRepo);
