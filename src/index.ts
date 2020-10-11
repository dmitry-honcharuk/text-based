/* istanbul ignore file */

import { GameEntityMapper } from './data/mappers/GameEntityMapper';
import { PlayerEntityMapper } from './data/mappers/PlayerEntityMapper';
import { RoomEntityMapper } from './data/mappers/RoomEntityMapper';
import { InMemoryGameRepository } from './data/repositories/InMemoryGameRepository';
import { InMemoryMapRepository } from './data/repositories/InMemoryMapRepository';
import { InMemoryPlayerRepository } from './data/repositories/InMemoryPlayerRepository';
import { InMemoryRoomRepository } from './data/repositories/InMemoryRoomRepository';
import { gameConfigValidationSchema } from './domain/entities/game-config';
import { GameConfigValidator } from './domain/entities/GameConfigValidator';
import { IncrementingIdGenerator } from './IncrementingIdGenerator';
import { Server } from './presentation/api-server/Server';

// @TODO Add request data validation

const playerRepository = new InMemoryPlayerRepository(
  new IncrementingIdGenerator(),
  new PlayerEntityMapper(),
);

const server = new Server(
  new InMemoryGameRepository(
    new GameEntityMapper(),
    new IncrementingIdGenerator(),
    playerRepository,
  ),
  new InMemoryRoomRepository(new RoomEntityMapper()),
  new GameConfigValidator(gameConfigValidationSchema),
  playerRepository,
  new InMemoryMapRepository(new IncrementingIdGenerator()),
);

server.run({ port: 5001 });
