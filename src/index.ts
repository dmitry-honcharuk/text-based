/* istanbul ignore file */

import { GameEntityMapper } from './data/mappers/GameEntityMapper';
import { PlayerDataEntityMapper } from './data/mappers/PlayerDataEntityMapper';
import { RoomEntityDataMapper } from './data/mappers/RoomEntityDataMapper';
import { InMemoryGameRepository } from './data/repositories/InMemoryGameRepository';
import { InMemoryPlayerRepository } from './data/repositories/InMemoryPlayerRepository';
import { InMemoryRoomRepository } from './data/repositories/InMemoryRoomRepository';
import { gameConfigValidationSchema } from './domain/entities/game-config';
import { GameConfigValidator } from './domain/entities/GameConfigValidator';
import { IncrementingIdGenerator } from './IncrementingIdGenerator';
import { Server } from './presentation/api-server/Server';

// @TODO Add request data validation

const playerRepository = new InMemoryPlayerRepository(
  new IncrementingIdGenerator(),
  new PlayerDataEntityMapper(),
);

const server = new Server(
  new InMemoryGameRepository(
    new GameEntityMapper(),
    new IncrementingIdGenerator(),
    playerRepository,
  ),
  new InMemoryRoomRepository(new RoomEntityDataMapper()),
  new GameConfigValidator(gameConfigValidationSchema),
  playerRepository,
);

server.run({ port: 5001 });
