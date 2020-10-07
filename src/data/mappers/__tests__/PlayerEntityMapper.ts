import { createPlayerDataMock } from '../../entities/__tests__/utils/mocks';
import { PlayerEntityMapper } from '../PlayerEntityMapper';

describe('PlayerEntityMapper', () => {
  it('should map data to entity', () => {
    const mapper = new PlayerEntityMapper();
    const data = createPlayerDataMock();

    const entity = mapper.fromDataToEntity(data);

    expect(entity.name).toBe(data.name);
  });
});
