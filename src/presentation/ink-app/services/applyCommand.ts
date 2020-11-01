import { ApplyCommandUseCase } from '../../../domain/usecases/ApplyCommandUseCase';
import { commandRepo, gameRepo, mapRepo, roomRepo } from '../dependencies';

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
  ).execute({
    commandInput: options.command,
    issuerId: options.playerId,
    gameId: options.gameId,
  });
}
