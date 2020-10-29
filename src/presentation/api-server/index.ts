/* istanbul ignore file */

import { GameEntityMapper } from '../../data/mappers/GameEntityMapper';
import { PlayerEntityMapper } from '../../data/mappers/PlayerEntityMapper';
import { RoomEntityMapper } from '../../data/mappers/RoomEntityMapper';
import { InMemoryCommandRepository } from '../../data/repositories/InMemoryCommandRepository';
import { InMemoryGameRepository } from '../../data/repositories/InMemoryGameRepository';
import { InMemoryMapRepository } from '../../data/repositories/InMemoryMapRepository';
import { InMemoryPlayerRepository } from '../../data/repositories/InMemoryPlayerRepository';
import { InMemoryRoomRepository } from '../../data/repositories/InMemoryRoomRepository';
import { gameConfigValidationSchema } from '../../domain/entities/game-config';
import { GameConfigValidator } from '../../domain/entities/GameConfigValidator';
import { IncrementingIdGenerator } from '../../IncrementingIdGenerator';
import { Server } from './Server';

const gameConfigValidator = new GameConfigValidator(gameConfigValidationSchema);

const playerRepository = new InMemoryPlayerRepository(
  new IncrementingIdGenerator(),
  new PlayerEntityMapper(),
);
const roomRepository = new InMemoryRoomRepository(
  new RoomEntityMapper(),
  new IncrementingIdGenerator(),
);
const gameRepository = new InMemoryGameRepository(
  new GameEntityMapper(),
  new IncrementingIdGenerator(),
  playerRepository,
);
const mapRepository = new InMemoryMapRepository(
  new IncrementingIdGenerator(),
  roomRepository,
);
const commandRepository = new InMemoryCommandRepository();

const server = new Server(
  gameRepository,
  roomRepository,
  gameConfigValidator,
  playerRepository,
  mapRepository,
  commandRepository,
);

export function runApp() {
  server.run({ port: 5001 });
}
