import { Box, Text, Flex } from '@chakra-ui/react';
import Logo from '@/components/UI/Logo';

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

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
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © {getCurrentYear()} Expenses Tracker. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
