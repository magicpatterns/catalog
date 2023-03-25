import { TTokens } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toJs = (tokens: TTokens): string => {
  const theme = createThemeObject(tokens)
  return 'export const Tokens = ' + JSON5.stringify(theme, { space: 2 })
}
