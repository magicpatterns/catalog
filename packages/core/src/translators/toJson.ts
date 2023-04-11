import { TPrimitives } from '@core/types'
import JSON5 from 'json5'

import { createThemeObject } from './createThemeObject'

export const toJson = (primitives: TPrimitives): string => {
  return JSON5.stringify(createThemeObject({ primitives }), null, 2)
}
