import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { FunctionComponent } from 'react';

type Props = {
  gameId: string;
  setGameId: (gameId: string) => void;
  setPlayerName: (playerName: string) => void;
};

export const StartGame: FunctionComponent<Props> = ({
  gameId,
  setGameId,
  setPlayerName,
}) => {
  const [gameIdInput, setGameIdInput] = React.useState('');
  const [playerNameInput, setPlayerNameInput] = React.useState('');

  const handleIdSubmit = (id: string) => {
    if (id.length) {
      setGameId(id);
      setGameIdInput('');
    }
  };

  const handlePlayerSubmit = (player: string) => {
    if (player.length) {
      setPlayerName(player);
      setPlayerNameInput('');
    }
  };

  return (
    <>
      <Box>
        <Box marginRight={1}>
          <Text>Enter {gameId ? 'your name' : 'game id'}:</Text>
        </Box>

        <TextInput
          value={gameId ? playerNameInput : gameIdInput}
          onChange={gameId ? setPlayerNameInput : setGameIdInput}
          onSubmit={gameId ? handlePlayerSubmit : handleIdSubmit}
        />
      </Box>
    </>
  );
};
