import { Participant } from '../entities/CombatManager';

export interface CombatRepository {
  startCombatInRoom(roomId: string, participants: Participant[]): Promise<void>;

  updateCombatInRoom(
    roomId: string,
    participants: Participant[],
  ): Promise<void>;

  getCombatParticipants(roomId: string): Promise<Participant[]>;
}
