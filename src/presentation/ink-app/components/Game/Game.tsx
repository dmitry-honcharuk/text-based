import { Box, Text } from 'ink';
import React from 'react';
import { GameContext } from '../../game-context';
import { applyCommand } from '../../services/applyCommand';
import { getRoomDescription } from '../../services/getRoomDescription';
import { CommandInput } from '../CommandInput/CommandInput';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export function Game() {
  const { gameId, playerId, playerName } = React.useContext(GameContext);
  const [commandStack, setCommandStack] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>('');

  const [roomDescription, setRoomDescription] = React.useState('');

  React.useEffect(() => {
    if (playerId) {
      getRoomDescription({ gameId, playerId }).then(setRoomDescription);
    }
  }, [gameId, playerId, commandStack]);

  const stackCommand = (command: string) =>
    setCommandStack((commands) => [...commands, command]);

  const registerCommand = async (command: string) => {
    try {
      await applyCommand({
        command,
        gameId,
        playerId,
      });
      stackCommand(command);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Box flexDirection='column'>
        <Text>Game id: {gameId}</Text>
        <Text>Player id: {playerId}</Text>
        <Text>Player name: {playerName}</Text>
      </Box>
      {!!commandStack.length && (
        <Box>
          <Box flexDirection='column' borderStyle='double' paddingX={1}>
            {commandStack.map((command, index) => (
              <Box key={index}>
                <Text>{command}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Box borderStyle='classic' padding={1} justifyContent='center'>
        <Text>{roomDescription}</Text>
      </Box>
      <Box>
        <CommandInput onCommand={registerCommand} />
      </Box>
      <Box>
        <ErrorMessage message={error} />
      </Box>
    </>
  );
}
