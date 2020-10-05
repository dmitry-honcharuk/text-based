/* istanbul ignore file */

import { GameDataEntityMapper } from './data/mappers/GameDataEntityMapper';
import { RoomEntityDataMapper } from './data/mappers/RoomEntityDataMapper';
import { InMemoryGameRepository } from './data/repositories/InMemoryGameRepository';
import { InMemoryRoomRepository } from './data/repositories/InMemoryRoomRepository';
import { gameConfigValidationSchema } from './domain/entities/game-config';
import { GameConfigValidator } from './domain/entities/GameConfigValidator';
import { IncrementingIdGenerator } from './IncrementingIdGenerator';
import { Server } from './presentation/api-server/Server';

const server = new Server(
  new InMemoryGameRepository(
    new GameDataEntityMapper(),
    new IncrementingIdGenerator(),
  ),
  new InMemoryRoomRepository(new RoomEntityDataMapper()),
  new GameConfigValidator(gameConfigValidationSchema),
);

server.run({ port: 5001 });
