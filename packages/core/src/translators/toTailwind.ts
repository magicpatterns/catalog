import { TPrimitives } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toTailwind = (primitives: TPrimitives): string => {
  return JSON5.stringify(createThemeObject(primitives), null, 2)
}
