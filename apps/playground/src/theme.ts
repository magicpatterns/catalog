import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: 'violet.500',
        _dark: 'violet.500',
      },
      primaryAccent: {
        default: 'violet.700',
        _dark: 'violet.700',
      },
      divider: {
        default: 'gray.700',
        _dark: 'gray.500',
      },
      bg: {
        default: 'space.700',
        _dark: 'space.700',
      },
      playgroundText: {
        default: 'space.300',
      },
      playgroundTextHover: {
        default: 'space.500',
      },
    },
  },
  colors: {
    space: {
      '200': '#cdcdd0',
      '300': '#b4b5b8',
      '400': '#9b9ca0',
      '500': '#828389',
      '700': '#040712',
    },
    violet: {
      '50': '#FAF5FF',
      '100': '#E9D8FD',
      '200': '#D6BCFA',
      '300': '#B794F4',
      '400': '#9F7AEA',
      '500': '#805AD5',
      '600': '#6B46C1',
      '700': '#553C9A',
      '800': '#44337A',
      '900': '#322659',
    },
  },
  components: {
    Button: {
      variants: {
        primary: (props: StyleFunctionProps) => ({
          bgGradient: 'linear(to-br, primary, primaryAccent)',
          shadow: 'sm',
          _hover: {
            bgGradient: 'linear(to-br, primaryAccent, primary)',
          },
          _active: {
            bgGradient: 'linear(to-b, primaryAccent, primary)',
          },
          color: 'white',
          lineHeight: 1.2,
          borderWidth: '1px',
          borderColor: 'divider',
        }),
        secondary: (props: StyleFunctionProps) => ({
          color: 'white',
          lineHeight: 1.2,
          bgGradient: 'linear(to-br, gray.800, bg)',
          _hover: {
            bgGradient: 'linear(to-br, bg, gray.800)',
          },
          _active: {
            bgGradient: 'linear(to-b, bg, gray.800)',
          },
          borderWidth: '1px',
          borderColor: 'divider',
        }),
        tab: (props: StyleFunctionProps) => ({
          color: 'playgroundText',
          border: 'none',
          background: 'transparent',
          padding: 0,
          fontSize: '12px',
          fontWeight: 'black',
          _hover: {
            color: 'playgroundTextHover',
          },
          _active: {
            color: 'primary',
          },
        }),
      },
      sizes: {
        compact: {
          height: '32px',
          padding: '0 16px',
          fontSize: '14px',
        },
      },
    },
    shadows: {
      primaryHover: '0 0 50px 15px primary',
    },
  },
})
