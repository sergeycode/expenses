import {
  Container,
  SimpleGrid,
  Button,
  Heading,
  Text,
  Stack,
  StackDivider,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { IconWithText, IIconWithText } from '@/components/UI/IconWithText';

export interface IMarketingHero {
  heading: string;
  text: string;
  icons: IIconWithText[];
  image: string;
}

export default function MarketingHero({
  heading,
  text,
  icons,
  image,
}: IMarketingHero) {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
        <Stack spacing={4}>
          <Heading
            bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
            bgClip="text"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="extrabold"
            lineHeight={1}
          >
            {heading}
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'md', md: 'lg' }}>
            {text}
          </Text>
          <Stack spacing={4}>
            {icons.map((icon) => (
              <IconWithText
                key={icon.text}
                icon={icon.icon}
                iconBg={icon.iconBg}
                text={icon.text}
              />
            ))}
          </Stack>
          <Button
            variant="gradient"
            as={NextLink}
            href="/signup"
            minH="3.125rem"
            maxW="15.625rem"
            transform={{ lg: 'translateY(2rem)' }}
          >
            <Box
              fontSize="md"
              zIndex={1}
              color="white"
              textTransform="uppercase"
            >
              Sing up for free
            </Box>
          </Button>
        </Stack>
        <Box borderRadius="xl" overflow="hidden">
          <Image
            src={image}
            alt={'feature image'}
            width={1200}
            height={800}
            priority={true}
          />
        </Box>
      </SimpleGrid>
    </Container>
  );
}
