import { ApplyCommandUseCase } from '../../../domain/usecases/ApplyCommandUseCase';
import {
  commandRepo,
  gameRepo,
  mapRepo,
  objectRepo,
  roomRepo,
} from '../dependencies';

export async function applyCommand(options: {
  command: string;
  gameId: string;
  playerId: string;
}) {
  return new ApplyCommandUseCase(
    mapRepo,
    commandRepo,
    roomRepo,
    gameRepo,
    objectRepo,
  ).execute({
    commandInput: options.command,
    issuerId: options.playerId,
    gameId: options.gameId,
  });
}
