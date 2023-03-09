import React from 'react';
import {Text, useTheme} from 'react-native-paper';

type FormErrorType = {
  message?: string | undefined;
};

export default function FormError({message}: FormErrorType) {
  const theme = useTheme();

  const mx10 = {
    marginHorizontal: 10,
  };

  return (
    <>
      {message ? (
        <Text variant="labelSmall" style={{color: theme.colors.error, ...mx10}}>
          {message}
        </Text>
      ) : null}
    </>
  );
}
