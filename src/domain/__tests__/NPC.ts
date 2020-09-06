import { random, name } from 'faker';
import { NPC } from '../NPC';

describe('NPC', () => {
  it('should be initiated properly', () => {
    const npcId = random.word();
    const npcName = name.firstName();
    const npcDamage = random.number();

    const npc = new NPC({
      id: npcId,
      name: npcName,
      damage: npcDamage,
    });

    expect(npc.id).toBe(npcId);
    expect(npc.name).toBe(npcName);
    expect(npc.damage).toBe(npcDamage);
  });
});
