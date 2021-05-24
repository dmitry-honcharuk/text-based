import {
  buildObjectParticipant,
  buildPlayerParticipant,
  CombatManager,
  Participant,
} from '../entities/CombatManager';
import { CombatStartEffectContext } from '../entities/EffectTrigger';
import { ObjectEntity } from '../entities/ObjectEntity';
import { isInCombatState, RoomState } from '../entities/RoomEntity';
import { WrongTurnError } from '../Errors/WrongTurnError';
import { RandomTurnOrderer } from '../Orderers/RandomTurnOrderer';
import { CombatRepository } from '../repositories/CombatRepository';
import { ObjectRepository } from '../repositories/ObjectRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { Effect, Options as EffectOptions } from './Effect';

// @TODO Combat repository?
// @TODO Combat manager
export class CombatStartEffect implements Effect {
  constructor(
    private context: CombatStartEffectContext,
    private object: ObjectEntity,
    private objectRepo: ObjectRepository,
    private roomRepo: RoomRepository,
    private combatRepo: CombatRepository,
  ) {}

  async execute(options: EffectOptions): Promise<void> {
    const { issuerRoomId, playerRoom, issuerId } = options;

    const participants = await this.getParticipants(options);

    if (!isInCombatState(playerRoom)) {
      console.log('COMBAT START IN', options.playerRoom.name);

      await this.roomRepo.updateState(issuerRoomId, RoomState.Combat);

      await this.combatRepo.startCombatInRoom(issuerRoomId, participants);
    }

    const combatManager = new CombatManager(participants);
    // @STEP Check if player can perform turn
    if (combatManager.isCorrectTurn(issuerId)) {
      // @STEP  no - throw an error
      throw new WrongTurnError();
    }
    // @STEP  yes - perform turn (effect?)
    // @STEP    pick + perform enemy action
  }

  private async getParticipants(
    options: EffectOptions,
  ): Promise<Participant[]> {
    const { playerRoom, issuerId, issuerRoomId } = options;

    if (isInCombatState(playerRoom)) {
      return this.combatRepo.getCombatParticipants(issuerRoomId);
    }

    return new RandomTurnOrderer().order([
      buildObjectParticipant(this.object.id),
      buildPlayerParticipant(issuerId),
    ]);
  }
}
