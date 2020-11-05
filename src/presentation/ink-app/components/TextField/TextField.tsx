import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { FunctionComponent, ReactNode } from 'react';

type Props = {
  label?: string | ReactNode;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export const TextField: FunctionComponent<Props> = ({
  label,
  onSubmit,
  value,
  onChange,
}) => {
  return (
    <>
      <Box>
        {label && (
          <Box marginRight={1}>
            <Text>{label}</Text>
          </Box>
        )}

        <TextInput value={value} onChange={onChange} onSubmit={onSubmit} />
      </Box>
    </>
  );
};
