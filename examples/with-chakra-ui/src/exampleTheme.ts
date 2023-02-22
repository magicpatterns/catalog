import { extendTheme } from '@chakra-ui/react'
import Tokens from '../.mirrorful/theme'

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
      ...Tokens.green.shades,
    },
    pink: {
      ...Tokens.pink.shades,
    },
    teal: {
      ...Tokens.teal.shades,
    },
  },
})
