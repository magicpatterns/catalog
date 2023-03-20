import { TTokens } from '@core/types'
import { createThemeObject } from './createThemeObject'

export const toJson = (tokens: TTokens): string => {
  return JSON.stringify(createThemeObject(tokens), null, 2)
}
