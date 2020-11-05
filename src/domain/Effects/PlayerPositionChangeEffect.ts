import { NoRoomError } from '../Errors/NoRoomError';
import { WrongMovementDirection } from '../Errors/WrongMovementDirection';
import { MapRepository } from '../repositories/MapRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { Effect, Options } from './Effect';

export class PlayerPositionChangeEffect implements Effect {
  constructor(
    private mapRepository: MapRepository,
    private roomRepository: RoomRepository,
  ) {}

  async execute({
    gameId,
    playerRoom,
    issuerId: playerId,
    possibleTargets: targets,
  }: Options) {
    const exit = playerRoom.exits.find(
      ({ id, name }) => targets.includes(id) || targets.includes(name),
    );

    if (!exit) {
      throw new WrongMovementDirection(targets.join(' | '));
    }

    const destinationRoomId = await this.roomRepository.getRoomIdByCustomId(
      gameId,
      exit.destinationRoomId,
    );

    if (!destinationRoomId) {
      throw new NoRoomError(exit.destinationRoomId);
    }

    await this.mapRepository.setPlayerLocation(
      gameId,
      playerId,
      destinationRoomId,
    );
  }
}
