import { TTokens } from '@core/types'

import { toJson } from './toJson'

export const toJs = (tokens: TTokens): string => {
  return 'export const Tokens = ' + toJson(tokens)
}
