import { Player } from '../../Player';
import { Game } from '../../Game';
import {
  createRandomPlayer,
  createRandomGame,
  createRandomMap,
  createRandomRoom,
  createRandomDirection,
} from '../../__tests__/utils/random.util';
import { GameMap } from '../../GameMap';
import { Room } from '../../Room';
import { MoveAction } from '../MoveAction';

describe('MoveAction', () => {
  let player: Player, lobby: Room, map: GameMap, game: Game;

  beforeEach(() => {
    player = createRandomPlayer();
    lobby = createRandomRoom();
    map = createRandomMap(lobby);
    game = createRandomGame([player], map);
  });

  it('should move player', () => {
    const southCorridor = createRandomDirection();
    const hallway = createRandomRoom();

    lobby.link(hallway, southCorridor);

    game.addPlayer(player);

    const moveAction = new MoveAction(player, game, {
      direction: southCorridor,
    });

    game.registerAction(moveAction);

    expect(game.map.getPlayerLocation(player)).toBe(lobby);

    game.applyActions();

    expect(game.map.getPlayerLocation(player)).toBe(hallway);
  });
});
