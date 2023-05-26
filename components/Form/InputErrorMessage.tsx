import { FormErrorMessage } from '@chakra-ui/react';
import { FormErrorIcon } from '@chakra-ui/react';

export const InputErrorMessage = ({ error }: { error: React.ReactNode }) => {
  return (
    <FormErrorMessage position="absolute" bottom="-1rem" fontSize="xs">
      <FormErrorIcon />
      {error}
    </FormErrorMessage>
  );
};
