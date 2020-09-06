import { random, name } from 'faker';
import { NPC } from '../NPC';

describe('NPC', () => {
  it('should be initiated properly', () => {
    const npcId = random.word();
    const npcName = name.firstName();

    const npc = new NPC({
      id: npcId,
      name: npcName,
    });

    expect(npc.id).toBe(npcId)
    expect(npc.name).toBe(npcName)
  });
})
