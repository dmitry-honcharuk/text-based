import { EffectType } from '../Effects/EffectType';
import {
  GameConfig,
  RoomConfig,
  RoomWithExitsConfig,
} from '../entities/game-config';
import { GameConfigValidator } from '../entities/GameConfigValidator';
import { RoomEntity } from '../entities/RoomEntity';
import { CommandRepository } from '../repositories/CommandRepository';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { UseCase } from './UseCase';

export class CreateGameUseCase implements UseCase<GameConfig, Promise<string>> {
  constructor(
    private gameConfigValidator: GameConfigValidator,
    private roomRepository: RoomRepository,
    private gameRepository: GameRepository,
    private mapRepository: MapRepository,
    private commandRepository: CommandRepository,
  ) {}

  async execute(config: GameConfig) {
    this.gameConfigValidator.validate(config);

    const {
      rooms: roomConfigs,
      startingRoom: startingRoom,
      playerAttributes = [],
    } = config;

    const gameId = await this.gameRepository.createGame();

    await this.gameRepository.setDefaultPlayerAttributes(playerAttributes);

    const startingRoomConfig = roomConfigs.find(
      ({ id }) => id === startingRoom,
    );

    const startingRoomId = await this.roomRepository.createRoom(
      gameId,
      this.getRoomFromConfig(startingRoomConfig as RoomConfig),
    );

    await Promise.all(
      roomConfigs
        .filter(({ id }) => id !== startingRoom)
        .map((room) =>
          this.roomRepository.createRoom(gameId, this.getRoomFromConfig(room)),
        ),
    );

    const roomsWithExits = roomConfigs.filter(
      ({ exits }) => !!exits,
    ) as RoomWithExitsConfig[];

    await Promise.all(
      roomsWithExits.map((room) => this.addExits(gameId, room)),
    );

    this.commandRepository.addCommand({
      gameId,
      command: 'go',
      effect: EffectType.PlayerLocationChange,
    });

    await this.mapRepository.createMap(gameId, startingRoomId);

    return gameId;
  }

  private getRoomFromConfig(roomConfig: RoomConfig): RoomEntity {
    return {
      ...roomConfig,
      exits:
        roomConfig.exits?.map((exitConfig) => ({
          ...exitConfig,
          destinationRoomId: exitConfig.roomId,
        })) ?? [],
    };
  }

  private async addExits(gameId: string, roomConfig: RoomWithExitsConfig) {
    await Promise.all(
      roomConfig.exits.map((exit) =>
        this.roomRepository.linkRooms(gameId, roomConfig.id, {
          id: exit.id,
          name: exit.name,
          destinationRoomId: exit.roomId,
        }),
      ),
    );
  }
}
