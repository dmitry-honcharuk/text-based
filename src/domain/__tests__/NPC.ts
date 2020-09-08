import { random, name } from 'faker';
import { NPC } from '../NPC';
import { createRandomAttackable } from '../combat/__tests__/utils/random';

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

  it('should properly increase health', () => {
    const npcId = random.word();
    const npcName = name.firstName();
    const npcHealth = random.number();
    const npcHealthIncrease = random.number();

    const npc = new NPC({
      id: npcId,
      name: npcName,
      health: npcHealth,
    });

    expect(npc.health).toBe(npcHealth);

    npc.increaseHealth(npcHealthIncrease);

    expect(npc.health).toBe(npcHealth + npcHealthIncrease);
  });

  it('should properly decrease health', () => {
    const npcId = random.word();
    const npcName = name.firstName();
    const npcHealth = 10;
    const npcHealthDecrease = 5;

    const npc = new NPC({
      id: npcId,
      name: npcName,
      health: npcHealth,
    });

    expect(npc.health).toBe(npcHealth);

    npc.decreaseHealth(npcHealthDecrease);

    expect(npc.health).toBe(npcHealth - npcHealthDecrease);

    npc.decreaseHealth(100);

    expect(npc.health).toBe(0);
  });

  it('should properly attack an attackable', () => {
    const id = random.word();
    const npcName = random.word();

    const npc = new NPC({
      id,
      name: npcName,
    });

    const attackable = createRandomAttackable();

    const damage = random.number();

    npc.attack(attackable, damage);

    expect(attackable.decreaseHealth).toHaveBeenCalledWith(damage);
  });
});
