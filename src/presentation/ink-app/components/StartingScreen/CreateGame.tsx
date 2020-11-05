import { Text } from 'ink';
import React, { FunctionComponent } from 'react';
import { TextField } from '../TextField/TextField';

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
    <TextField
      label={
        <>
          <Text>Enter path to game config: </Text>
          <Text color='gray'>[{DEFAULT_PATH}]</Text>
        </>
      }
      value={pathInput}
      onChange={setPathInput}
      onSubmit={handlePathSubmit}
    />
  );
};
