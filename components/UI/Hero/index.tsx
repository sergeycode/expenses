import { Box, Avatar, Button, Grid, GridItem } from '@chakra-ui/react';
import { useFirebaseApp } from 'reactfire';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Hero({
  title,
  name,
  email,
}: {
  title: string;
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };
  return (
    <>
      <Box
        bgImage="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
        w="100%"
        height={{ base: '7.5rem', md: '8.5rem' }}
        borderRadius="3xl"
        pl="2.5%"
        pt={5}
      >
        <Box color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Box>
      </Box>
      <Grid
        background="rgba(255, 255, 255, 0.8)"
        backdropFilter="saturate(200%) blur(50px)"
        w="95%"
        mx="auto"
        transform="translateY(-50px)"
        minHeight="6.25rem"
        borderRadius="3xl"
        border="2px solid #FFF"
        px={4}
        py={6}
        gap={4}
        alignItems="center"
        templateColumns="10fr 2fr"
      >
        <GridItem display="flex" alignItems="center">
          <Avatar
            name={name || ''}
            borderRadius="xl"
            bgImage="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
          />
          <Box ml={3}>
            <Box
              fontSize="lg"
              fontWeight="bold"
              maxW={{ base: '10.625rem', md: 'auto' }}
              isTruncated
            >
              {name}
            </Box>
            <Box fontSize="sm" color="gray.500" fontWeight="semibold">
              {email}
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Button ml="auto" mr="0" onClick={handleSignOut} variant="gradient">
            <Box zIndex="1" color={'white'}>
              Logout
            </Box>
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}
