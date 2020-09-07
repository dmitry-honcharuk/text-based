import { name, random } from 'faker';

import { Player } from '../Player';
import { DEFAULT_HEALTH } from '../combat/Attackable';

describe('Player', () => {
  it('should have given name and default health after initialization', () => {
    const playerName = name.firstName();

    const player = new Player({
      name: playerName,
    });

    expect(player.name).toBe(playerName);
    expect(player.health).toBe(DEFAULT_HEALTH);
  });

  it('should have given name and health after initialization', () => {
    const playerHealth = random.number();

    const player = new Player({
      name: name.firstName(),
      health: playerHealth,
    });

    expect(player.health).toBe(playerHealth);
  });

  it('should properly increase health', () => {
    const playerHealth = random.number();
    const healthIncrease = random.number();

    const player = new Player({
      name: name.firstName(),
      health: playerHealth,
    });

    player.increaseHealth(healthIncrease);

    expect(player.health).toBe(playerHealth + healthIncrease);
  });

  it('should properly decrease health', () => {
    const playerHealth = 100;
    const healthDecrease = 90;

    const player = new Player({
      name: name.firstName(),
      health: playerHealth,
    });

    player.decreaseHealth(healthDecrease);

    expect(player.health).toBe(playerHealth - healthDecrease);
  });

  it('should set health to 0 if health decrease is greater than player health', () => {
    const playerHealth = 50;
    const healthDecrease = 100;

    const player = new Player({
      name: name.firstName(),
      health: playerHealth,
    });

    player.decreaseHealth(healthDecrease);

    expect(player.health).toBe(0);
  });
});
