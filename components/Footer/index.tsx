import { Box, Text, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '/public/images/logo.svg';

export default function Footer() {
  return (
    <Box bg="gray.50" color="gray.700">
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image src={logo} alt="logo" width={50} height={50} />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022 Expenses. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
