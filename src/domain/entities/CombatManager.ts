export enum ParticipantType {
  Player,
  Object,
}

export interface Participant {
  id: string;
  type: ParticipantType;
}

export class CombatManager {
  constructor(private participants: Participant[]) {}

  isCorrectTurn(participantId: string): boolean {
    const [next] = this.participants;

    return next?.id === participantId;
  }
}

function createBuildParticipant(type: ParticipantType) {
  return (id: string): Participant => ({
    id,
    type,
  });
}

export const buildPlayerParticipant = createBuildParticipant(
  ParticipantType.Player,
);
export const buildObjectParticipant = createBuildParticipant(
  ParticipantType.Object,
);
