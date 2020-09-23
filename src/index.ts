import { InMemoryGameRepository } from './data/repositories/InMemoryGameRepository';
import { GameDataEntityMapper } from './data/mappers/GameDataEntityMapper';
import { InMemoryRoomRepository } from './data/repositories/InMemoryRoomRepository';
import { RoomEntityDataMapper } from './data/mappers/RoomEntityDataMapper';
import { GameConfigValidator } from './domain/entities/GameConfigValidator';
import { gameConfigValidationSchema } from './domain/entities/game-config';

import { Server } from './presentation/api-server';

const server = new Server(
  new InMemoryGameRepository(new GameDataEntityMapper()),
  new InMemoryRoomRepository(new RoomEntityDataMapper()),
  new GameConfigValidator(gameConfigValidationSchema),
);

server.run({ port: 5001 });
