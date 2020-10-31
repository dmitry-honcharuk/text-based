import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { FunctionComponent } from 'react';

type Props = {
  setConfigPath: (configPath: string) => void;
};

const DEFAULT_PATH = './game.json';

export const CreateGame: FunctionComponent<Props> = ({ setConfigPath }) => {
  const [pathInput, setPathInput] = React.useState('');

  const handlePathSubmit = (path: string) => {
    setConfigPath(path || DEFAULT_PATH);
    setPathInput('');
  };

  return (
    <>
      <Box>
        <Box marginRight={1}>
          <Text>Enter path to game config: </Text>
          <Text color='gray'>[{DEFAULT_PATH}]</Text>
        </Box>

        <TextInput
          value={pathInput}
          onChange={setPathInput}
          onSubmit={handlePathSubmit}
        />
      </Box>
    </>
  );
};
