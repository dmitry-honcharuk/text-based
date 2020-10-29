import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { FunctionComponent } from 'react';

type Props = {
  onStart: (gameId: string, name: string) => void;
};

export const StartGame: FunctionComponent<Props> = ({ onStart }) => {
  const [isIdEntered, setIdEntered] = React.useState(false);
  const [gameId, setGameId] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');

  const handleGameIdSubmit = (gameId: string) => {
    if (gameId.length) {
      setIdEntered(true);
    }
  };

  const handleNameSubmit = (name: string) => {
    if (name.length) {
      onStart(gameId, playerName);
    }
  };

  return (
    <>
      <Box>
        <Box marginRight={1}>
          <Text>Enter {isIdEntered ? 'your name' : 'game id'}:</Text>
        </Box>

        <TextInput
          value={isIdEntered ? playerName : gameId}
          onChange={isIdEntered ? setPlayerName : setGameId}
          onSubmit={isIdEntered ? handleNameSubmit : handleGameIdSubmit}
        />
      </Box>
    </>
  );
};
