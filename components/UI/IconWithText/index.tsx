import { Flex, Text, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

export interface IIconWithText {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export function IconWithText({ text, icon, iconBg }: IIconWithText) {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} fontSize="sm">
        {text}
      </Text>
    </Stack>
  );
}
