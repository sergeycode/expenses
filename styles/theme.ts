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
