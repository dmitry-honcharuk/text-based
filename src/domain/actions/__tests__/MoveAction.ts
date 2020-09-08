import { random } from 'faker';
import {
  createRandomDirection,
  createRandomGame,
  createRandomMap,
  createRandomPlayer,
  createRandomRoom
} from '../../__tests__/utils/random.util';
import { NoSuchPlayerError } from '../../../Errors/NoSuchPlayerError';
import { GameMap } from '../../GameMap';
import { Game } from '../../Game';
import { Player } from '../../Player';
import { MoveAction } from '../MoveAction';
import { WrongDestinationError } from '../../../Errors/WrongDestinationError';

describe('Move Action', () => {
  let map: GameMap, game: Game, player: Player, direction: string;

  beforeEach(() => {
    player = createRandomPlayer();
    map = createRandomMap();
    game = createRandomGame([], map);
    direction = random.word();
  });

  it('should throw if player is not in the game', () => {
    const action = new MoveAction({ direction });

    expect(() => {
      action.apply(game, player)
    }).toThrowError(new NoSuchPlayerError(player.name));
  });

  it('should throw destination is not correct', () => {
    game.addPlayer(player);

    const action = new MoveAction({ direction });

    expect(() => {
      action.apply(game, player)
    }).toThrowError(new WrongDestinationError(direction));
  });

  it('should properly move player', () => {
    const hallway = createRandomRoom();
    const direction = createRandomDirection();

    const lobby = createRandomRoom({
      npc: [],
      exits: new Map([[direction, hallway]]),
    });

    const map = createRandomMap(lobby);
    const game = createRandomGame([], map);

    game.addPlayer(player);

    const action = new MoveAction({ direction: direction.id });

    jest.spyOn(map, 'setPLayerLocation').mockImplementation();

    expect(() => {
      action.apply(game, player)
    }).not.toThrow();

    expect(map.setPLayerLocation).toBeCalledWith(player, hallway);
  });
});
