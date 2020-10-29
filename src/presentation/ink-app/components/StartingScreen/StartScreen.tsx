import { Box, Text } from 'ink';
import React, { FunctionComponent } from 'react';
import { MainMenu } from './MainMenu';

type Props = {
  onGameStart: (gameId: string, playerName: string) => void;
  onGameCreate: () => void;
};

export const StartScreen: FunctionComponent<Props> = ({
  onGameStart,
  onGameCreate,
}) => {
  return (
    <>
      <Box borderStyle='classic' padding={1} justifyContent='center'>
        <Text bold>Text based</Text>
      </Box>
      <MainMenu onCreateGame={onGameCreate} onStartGame={onGameStart} />
    </>
  );
};
