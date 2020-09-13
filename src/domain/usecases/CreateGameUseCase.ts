import { GameRepository } from '../repositories/GameRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { RoomEntity } from '../entities/RoomEntity';
import { UseCase } from './UseCase';

import { GameConfig, RoomWithExitsConfig } from '../entities/game-config';
import { GameConfigValidator } from '../entities/GameConfigValidator';

export class CreateGameUseCase implements UseCase<GameConfig, Promise<string>> {
  constructor(
    private roomRepository: RoomRepository,
    private gameRepository: GameRepository,
    private gameConfigValidator: GameConfigValidator,
  ) {}

  async execute(config: GameConfig) {
    this.gameConfigValidator.validate(config);

    const { rooms: roomConfigs } = config;

    const game = await this.gameRepository.createGame();

    await Promise.all(
      roomConfigs.map((room) =>
        this.roomRepository.createRoom(
          new RoomEntity({ ...room, gameId: game.id }),
        ),
      ),
    );

    const roomsWithExits = roomConfigs.filter(
      ({ exits }) => !!exits,
    ) as RoomWithExitsConfig[];

    await Promise.all(roomsWithExits.map((room) => this.addExits(room)));

    return game.id;
  }

  private async addExits(roomConfig: RoomWithExitsConfig) {
    await Promise.all(
      roomConfig.exits.map((exit) =>
        this.roomRepository.linkRooms(roomConfig.id, {
          id: exit.id,
          name: exit.name,
          destinationId: exit.roomId,
        }),
      ),
    );
  }
}
