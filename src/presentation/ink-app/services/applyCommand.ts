import { ApplyCommandUseCase } from '../../../domain/usecases/ApplyCommandUseCase';
import {
  combatRepo,
  commandRepo,
  gameRepo,
  mapRepo,
  objectRepo,
  playerRepo,
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
    combatRepo,
    playerRepo,
  ).execute({
    commandInput: options.command,
    issuerId: options.playerId,
    gameId: options.gameId,
  });
}
