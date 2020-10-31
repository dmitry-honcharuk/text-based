import { render } from 'ink';
import React, { FunctionComponent } from 'react';
import { Game } from './components/Game/Game';
import { StartScreen } from './components/StartingScreen/StartScreen';
import { GameContext } from './game-context';

const App: FunctionComponent = () => {
  const [isGameStarted, setGameStarted] = React.useState(false);
  const [options, setOptions] = React.useState({
    gameId: '',
    playerId: '',
    playerName: '',
  });

  const handleStartGame = (options: {
    gameId: string;
    playerId: string;
    playerName: string;
  }) => {
    setGameStarted(true);
    setOptions(options);
  };

  if (!isGameStarted) {
    return <StartScreen onGameStart={handleStartGame} />;
  }

  return (
    <GameContext.Provider value={options}>
      <Game />
    </GameContext.Provider>
  );
};

export function runApp() {
  render(<App />);
}
