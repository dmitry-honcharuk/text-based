import { Box, Text } from 'ink';
import React, { FunctionComponent } from 'react';

type Props = {
  message?: string;
};

export const ErrorMessage: FunctionComponent<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <Box borderStyle='bold' borderColor='red' paddingX={1}>
      <Text>{message}</Text>
    </Box>
  );
};
