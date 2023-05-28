import { HStack, Box, Avatar } from '@chakra-ui/react';

export default function Logo() {
  return (
    <HStack>
      <Avatar
        size="sm"
        name="E T"
        borderRadius="lg"
        fontWeight="bold"
        bgImage="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
      />
      <Box
        bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
        bgClip="text"
        fontWeight="bold"
        fontSize="md"
        lineHeight={1}
      >
        Expenses Tracker
      </Box>
    </HStack>
  );
}
