import React, { FunctionComponent } from 'react';
import { TextField } from '../TextField/TextField';

type Props = {
  onCommand: (command: string) => void;
};

export const CommandInput: FunctionComponent<Props> = ({ onCommand }) => {
  const [command, setCommand] = React.useState('');

  return (
    <TextField
      onSubmit={(command) => {
        if (command.length) {
          onCommand(command);
          setCommand('');
        }
      }}
      label='I want to: '
      value={command}
      onChange={setCommand}
    />
  );
};
