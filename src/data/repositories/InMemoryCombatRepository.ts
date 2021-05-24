import { Participant } from '../../domain/entities/CombatManager';
import { CombatRepository } from '../../domain/repositories/CombatRepository';

export class InMemoryCombatRepository implements CombatRepository {
  getCombatParticipants(roomId: string): Promise<Participant[]> {
    throw new Error('Not yet implemented');
  }

  startCombatInRoom(
    roomId: string,
    participants: Participant[],
  ): Promise<void> {
    throw new Error('Not yet implemented');
  }

  updateCombatInRoom(
    roomId: string,
    participants: Participant[],
  ): Promise<void> {
    throw new Error('Not yet implemented');
  }
}
