import { Box, HStack, Avatar } from '@chakra-ui/react';

export default function Hero({
  title,
  name,
  email,
}: {
  title: string;
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  return (
    <>
      <Box
        bgImage="linear-gradient(161deg, #08AEEA 0%, #2AF598 100%)"
        w="100%"
        height={{ base: '10rem', md: '12.5rem' }}
        borderRadius="3xl"
        pl="2.5%"
        pt={5}
      >
        <Box color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Box>
      </Box>
      <HStack
        background="rgba(255, 255, 255, 0.8)"
        backdropFilter="saturate(200%) blur(50px)"
        w="95%"
        mx="auto"
        mt="-50px"
        height="100px"
        borderRadius="3xl"
        border="2px solid #FFF"
        alignItems="center"
        px={4}
      >
        <Avatar
          name={name || ''}
          borderRadius="xl"
          bgImage="linear-gradient(161deg, #08AEEA 0%, #2AF598 100%)"
        />
        <Box>
          <Box fontSize="lg" fontWeight="bold">
            {name}
          </Box>
          <Box fontSize="sm" color="gray.500" fontWeight="semibold">
            {email}
          </Box>
        </Box>
      </HStack>
    </>
  );
}
