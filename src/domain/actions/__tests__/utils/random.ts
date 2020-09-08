import { Action } from '../../Action';

export function createRandomAction(): Action {
  return {
    apply: jest.fn(),
  };
}
