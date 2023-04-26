import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const lightTheme = {
  backgroundColors: {
    primary: 'white',
    secondary: '#F2F2F2',
  },
  buttons: {
    backgroundColors: {
      default: 'gray.600',
      hover: 'gray.200',
    },
    textColors: {
      primary: 'black',
      secondary: '#141414',
    },
  },
  text: {
    colors: {
      primary: 'black',
      secondary: '#161717',
    },
  },
  links: {
    colors: {
      active: 'black',
      inactive: 'gray',
    },
  },
  headings: {
    colors: {
      large: 'black',
      medium: '#161717',
    },
  },
}

export const darkTheme = {
  backgroundColors: {
    primary: '#121212',
    secondary: '#171717',
  },
  buttons: {
    small: {
      backgroundColors: {
        default:
          'linear-gradient(#121212, #121212) padding-box, linear-gradient(to right, red, #851717) border-box',
        hover:
          'linear-gradient(#121212, #121212) padding-box, linear-gradient(to left, red, #851717) border-box',
      },
      textColors: '#ff9797',
    },
    large: {
      backgroundColors: {
        default:
          'linear-gradient(#121212, #121212) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box',
        hover:
          'linear-gradient(#121212, #121212) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box',
      },
      textColors: '#9f7aea',
    },
  },
  text: {
    colors: {
      primary: '#d2cfcf',
      secondary: '#01b5f7',
    },
  },
  links: {
    colors: {
      active: '#a2c0cf',
      inactive: '#5a5a5a',
    },
  },
  headings: {
    colors: {
      large: '-webkit-linear-gradient(#4b0071, #9c0ae6)',
      medium: '-webkit-linear-gradient(#a7a3a1, #6a6462)',
    },
  },
}

const theme = extendTheme({
  config,
})

export default theme
