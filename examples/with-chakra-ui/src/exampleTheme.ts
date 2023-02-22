import { extendTheme } from '@chakra-ui/react'
import { Tokens } from '../.mirrorful/theme'

export const exampleTheme = extendTheme({
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  },
  colors: {
    primary: {
      ...Tokens.primary.shades,
    },
    green: {
      ...Tokens['lizard-green'].shades,
    },
    pink: {
      ...Tokens['hot-pink'].shades,
    },
    teal: {
      ...Tokens['cool-teal'].shades,
    },
  },
})
