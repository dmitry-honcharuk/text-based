import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { join } from 'path';
import React, { FunctionComponent } from 'react';
import { createGame } from '../../services/createGame';
import { startGame } from '../../services/startGame';
import { CreateGame } from './CreateGame';
import { MAIN_MENU_ITEMS } from './menu-items';
import { Option } from './MenuOptions';
import { StartGame } from './StartGame';

type Props = {
  onGameStart: (options: {
    gameId: string;
    playerId: string;
    playerName: string;
  }) => void;
};

export const StartScreen: FunctionComponent<Props> = ({ onGameStart }) => {
  const [newGameId, setNewGameId] = React.useState('');
  const [error, setError] = React.useState('');
  const [currentOption, setCurrentOption] = React.useState<Option | null>(null);
  const [startingGameId, setStartingGameId] = React.useState('');

  const handleGameCreate = (configPath: string) => {
    const cwd = process.cwd();

    import(join(cwd, configPath))
      .then((config) => createGame(config.default))
      .then(setNewGameId)
      .then(() => setCurrentOption(null))
      .catch((error) => {
        if (error.code === 'MODULE_NOT_FOUND') {
          throw new Error(`Could not find config. (${configPath})`);
        }

        throw error;
      })
      .catch(({ message }) => setError(message));
  };

  const handleStartGame = (gameId: string, playerName: string) => {
    startGame(gameId, playerName)
      .then((playerId) => {
        onGameStart({
          gameId,
          playerId,
          playerName,
        });
      })
      .catch(({ message }) => {
        setCurrentOption(null);
        setStartingGameId('');
        setError(message);
      });
  };

  const setPlayerName = (playerName: string) => {
    handleStartGame(startingGameId, playerName);
  };

  return (
    <>
      {!!error && (
        <Box borderStyle='bold' borderColor='red' paddingX={1}>
          <Text>{error}</Text>
        </Box>
      )}
      <Box borderStyle='classic' padding={1} justifyContent='center'>
        <Text bold>Text based</Text>
      </Box>
      {!!newGameId && (
        <Box justifyContent='flex-end'>
          <Box borderStyle='single' width='25%' justifyContent='center'>
            <Text>New game id: </Text>
            <Text bold color='blueBright'>
              {newGameId}
            </Text>
          </Box>
        </Box>
      )}
      {!currentOption && (
        <SelectInput
          items={MAIN_MENU_ITEMS}
          onSelect={({ value }) => setCurrentOption(value)}
        />
      )}
      {currentOption === Option.CreateGame && (
        <CreateGame setConfigPath={handleGameCreate} />
      )}
      {currentOption === Option.StartGame && (
        <StartGame
          gameId={startingGameId}
          setGameId={setStartingGameId}
          setPlayerName={setPlayerName}
        />
      )}
    </>
  );
};
