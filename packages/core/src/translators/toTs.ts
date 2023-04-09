import { TTokens } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toTs = (tokens: TTokens): string => {
  const theme = createThemeObject(tokens)
  return `
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type FontWeight = keyof typeof Tokens.fontWeights
  export type LineHeight = keyof typeof Tokens.lineHeights
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | FontWeight | LineHeight | Shadows

  export const Tokens = ${JSON5.stringify(theme, { space: 2 })}
  `
}
