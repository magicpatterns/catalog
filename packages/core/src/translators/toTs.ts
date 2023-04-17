import { TPrimitives } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toTs = (primitives: TPrimitives): string => {
  const theme = createThemeObject({ primitives })
  return `
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = ${JSON5.stringify(theme, { space: 2 })}
  `
}
