import { TTokens } from 'types'
import { createThemeObject } from './createThemeObject'

export const toJson = (tokens: TTokens): string => {
  return JSON.stringify(createThemeObject(tokens), null, 2)
}
