import { EffectType } from '../Effects/EffectType';
import { EffectTriggerConfig } from '../entities/EffectTrigger';
import { createEntityAttributes } from '../entities/EntityAttributes';
import {
  GameConfig,
  ObjectConfig,
  RoomConfig,
  RoomWithExitsConfig,
} from '../entities/game-config';
import { GameConfigValidator } from '../entities/GameConfigValidator';
import { ObjectEntity } from '../entities/ObjectEntity';
import { getRoomFromConfig } from '../entities/RoomEntity';
import { CommandRepository } from '../repositories/CommandRepository';
import { GameRepository } from '../repositories/GameRepository';
import { MapRepository } from '../repositories/MapRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { UseCase } from './UseCase';

export class CreateGameUseCase implements UseCase<GameConfig, Promise<string>> {
  constructor(
    private gameConfigValidator: GameConfigValidator,
    private roomRepository: RoomRepository,
    private gameRepository: GameRepository,
    private mapRepository: MapRepository,
    private commandRepository: CommandRepository,
    private objectRepository: ObjectRepository,
  ) {}

  async execute(config: GameConfig) {
    this.gameConfigValidator.validate(config);

    const {
      rooms: roomConfigs,
      startingRoom: startingRoom,
      playerAttributes = [],
    } = config;

    const gameId = await this.gameRepository.createGame(config.game);

    await this.gameRepository.setDefaultPlayerAttributes(playerAttributes);

    const startingRoomConfig = roomConfigs.find(
      ({ id }) => id === startingRoom,
    );

    const [startingRoomId] = await Promise.all([
      this.createRoom(gameId, startingRoomConfig as RoomConfig),
      ...roomConfigs
        .filter(({ id }) => id !== startingRoom)
        .map((room) => this.createRoom(gameId, room)),
    ]);

    const roomsWithExits = roomConfigs.filter(
      ({ exits }) => !!exits,
    ) as RoomWithExitsConfig[];

    await Promise.all(
      roomsWithExits.map((room) => this.addExits(gameId, room)),
    );

    await this.commandRepository.addGlobalCommand({
      gameId,
      command: ['go', 'exit', 'move'],
      effect: EffectType.PlayerLocationChange,
    });

    await this.mapRepository.createMap(gameId, startingRoomId);

    return gameId;
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

  private async createRoom(gameId: string, room: RoomConfig) {
    const roomId = await this.roomRepository.createRoom(
      gameId,
      getRoomFromConfig(room),
    );

    if (room.objects) {
      await this.createObjects(roomId, room.objects);
    }

    return roomId;
  }

  private async createObjects(roomId: string, objects: ObjectConfig[]) {
    await Promise.all(
      objects.map(async (objectConfig) => {
        const object: ObjectEntity = {
          id: objectConfig.id,
          name: objectConfig.name,
          aliases: objectConfig.aliases,
        };

        if (objectConfig.attributes) {
          object.attributes = createEntityAttributes(objectConfig.attributes);
        }

        await this.objectRepository.createObject(roomId, object);

        await this.createObjectCommands(roomId, object, objectConfig.triggers);
      }),
    );
  }

  private async createObjectCommands(
    roomId: string,
    object: ObjectEntity,
    triggerConfigs: EffectTriggerConfig[],
  ) {
    await Promise.all(
      triggerConfigs.map(async ({ command, conditions, effects }) => {
        await this.commandRepository.addRoomCommand({
          roomId,
          object,
          command,
          conditions: conditions ?? [],
          effectTriggers: effects,
        });
      }),
    );
  }
}
