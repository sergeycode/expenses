import { extendTheme } from '@chakra-ui/react';
import { Raleway, Jost } from '@next/font/google';

const raleway = Raleway({ subsets: ['latin'], display: 'swap' });
const jost = Jost({ subsets: ['latin'], display: 'swap' });

const customButtonProps = {
  fontFamily: 'heading',
  fontSize: 'sm',
  borderRadius: '0',
  minH: '42px',
  fontWeight: 'medium',
  textTransform: 'uppercase',
  transition: 'all .2s ease-in-out',
};

const theme = extendTheme({
  fonts: {
    heading: jost.style.fontFamily,
    body: raleway.style.fontFamily,
  },
  colors: {
    transparent: 'transparent',
    // colors based on design
    brand: {
      main: '#5990dc',
    },
    accent: {
      main: '#41a785',
    },
    ui: {
      primary: '#181819',
    },
    text: {
      primary: '#181819',
      secondary: '#41a785',
    },
    bg: {
      primary: '#F1F1F1',
      secondary: '#EFF6FF',
    },
    // shades with Tailwind Shades plugin where 500 is the main/primary color
    blue: {
      100: '#dee9f8',
      200: '#bdd3f1',
      300: '#9bbcea',
      400: '#7aa6e3',
      500: '#5990dc',
      600: '#4773b0',
      700: '#355684',
      800: '#243a58',
      900: '#121d2c',
    },
    teal: {
      100: '#d9ede7',
      200: '#b3dcce',
      300: '#8dcab6',
      400: '#67b99d',
      500: '#41a785',
      600: '#34866a',
      700: '#276450',
      800: '#1a4335',
      900: '#0d211b',
    },
    black: {
      100: '#d1d1d1',
      200: '#a3a3a3',
      300: '#747475',
      400: '#464647',
      500: '#181819',
      600: '#131314',
      700: '#0e0e0f',
      800: '#0a0a0a',
      900: '#050505',
    },
  },
  styles: {
    global: {
      body: {
        color: 'text.primary',
      },
      p: {
        color: 'text.primary',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: ['100%', '540px', '720px', '960px', '1140px', '1280px'],
        px: { base: 8, xl: 0 },
      },
    },
    Button: {
      variants: {
        primary: {
          ...customButtonProps,
          bgColor: 'ui.primary',
          color: 'white',
          _hover: {
            background: 'black.400',
          },
        },
        secondary: {
          ...customButtonProps,
          color: 'white',
          bgColor: 'brand.main',
          _hover: {
            background: 'blue.600',
          },
        },
      },
    },
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
    '3xl': '1600px',
  },
});

export default theme;
