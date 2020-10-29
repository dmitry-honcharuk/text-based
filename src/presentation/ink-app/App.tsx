import { render, Text } from 'ink';
import React, { FunctionComponent } from 'react';
import { StartScreen } from './components/StartingScreen/StartScreen';

type Props = {
  filepath: string;
};

const App: FunctionComponent<Props> = ({ filepath }) => {
  const [gameId, setGameId] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');

  const handleStartGame = (gameId: string, playerName: string) => {
    setGameId(gameId);
    setPlayerName(playerName);
  };

  const handleGameCreate = () => {
    console.log('CREATE', filepath);
    import(filepath)
      .then((config) => {
        console.log(config);
      })
      .catch((e) => {
        console.log('ERROR', e);
      });
  };

  if (!gameId || !playerName) {
    return (
      <StartScreen
        onGameCreate={handleGameCreate}
        onGameStart={handleStartGame}
      />
    );
  }

  return (
    <>
      <Text>Game id: {gameId}</Text>
      <Text>Player name: {playerName}</Text>
    </>
  );
};

export function runApp(gameConfigPath: string) {
  render(<App filepath={gameConfigPath} />);
}
