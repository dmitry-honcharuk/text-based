import { createPlayerDataMock } from '../../entities/__tests__/utils/mocks';
import { PlayerDataEntityMapper } from '../PlayerDataEntityMapper';

describe('PlayerDataEntityMapper', () => {
  it('should map data to entity', () => {
    const mapper = new PlayerDataEntityMapper();
    const data = createPlayerDataMock();

    const entity = mapper.map(data);

    expect(entity.id).toBe(data.id);
    expect(entity.name).toBe(data.name);
  });
});
