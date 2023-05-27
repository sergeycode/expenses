import { extendTheme } from '@chakra-ui/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const theme = extendTheme({
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  components: {
    Container: {
      baseStyle: {
        maxW: ['100%', '540px', '720px', '960px', '1140px'],
      },
    },
    Button: {
      variants: {
        gradient: {
          fontSize: 'sm',
          fontWeight: 600,
          position: 'relative',
          bgGradient: 'linear(to-t, #08AEEA 40%, #2AF598 100%)',
          overflow: 'hidden',
          _before: {
            position: 'absolute',
            content: `""`,
            width: '100%',
            height: '100%',
            bgGradient: 'linear(to-b, #08AEEA 40%, #2AF598 100%)',
            transition: 'opacity 1s',
          },
          _hover: {
            _before: { opacity: 0 },
          },
        },
      },
    }
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
});

export default theme;
