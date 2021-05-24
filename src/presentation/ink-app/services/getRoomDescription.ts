import { GetRoomDescriptionUseCase } from '../../../domain/usecases/GetRoomDescriptionUseCase';
import { gameRepo, mapRepo } from '../dependencies';

export function getRoomDescription(options: {
  gameId: string;
  playerId: string;
}) {
  return new GetRoomDescriptionUseCase(gameRepo, mapRepo).execute(options);
}
