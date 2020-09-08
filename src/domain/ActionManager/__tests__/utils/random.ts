import { ActionManager } from '../../ActionManager';

export function createRandomActionManager(): ActionManager {
  return {
    registerAction: jest.fn(),
  };
}
