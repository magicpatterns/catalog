import { TTokens } from 'types'
import { toJson } from './toJson'

export const toCjs = (tokens: TTokens): string => {
  return 'exports.Tokens = ' + toJson(tokens)
}
