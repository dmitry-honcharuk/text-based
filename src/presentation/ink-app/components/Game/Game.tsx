import { Box, Text } from 'ink';
import React, { useContext } from 'react';
import { GameContext } from '../../game-context';

export function Game() {
  const { gameId, playerId, playerName } = useContext(GameContext);

  return (
    <Box flexDirection='column'>
      <Text>Game id: {gameId}</Text>
      <Text>Player id: {playerId}</Text>
      <Text>Player name: {playerName}</Text>
    </Box>
  );
}
