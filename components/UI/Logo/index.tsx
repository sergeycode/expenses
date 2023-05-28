import Image from 'next/image';
import { HStack, Box } from '@chakra-ui/react';
import logo from '/public/images/logo.webp';

export default function Logo() {
  return (
    <HStack>
      <Box borderRadius="lg" overflow="hidden">
        <Image src={logo} alt="logo" width={35} height={35} />
      </Box>
      <Box
        bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
        bgClip="text"
        fontWeight="bold"
        fontSize="md"
      >
        Expenses Tracker
      </Box>
    </HStack>
  );
}
