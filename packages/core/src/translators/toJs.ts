import { TPrimitives } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toJs = (primitives: TPrimitives): string => {
  const theme = createThemeObject(primitives)
  return 'export const Tokens = ' + JSON5.stringify(theme, { space: 2 })
}
