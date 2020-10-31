import { createContext } from 'react';

export const GameContext = createContext<{
  gameId: string;
  playerId: string;
  playerName: string;
}>({
  gameId: '',
  playerId: '',
  playerName: '',
});
