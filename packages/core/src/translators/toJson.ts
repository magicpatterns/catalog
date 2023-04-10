import { TPrimitives } from '@core/types'

import { createThemeObject } from './createThemeObject'

export const toJson = (primitives: TPrimitives): string => {
  return JSON.stringify(createThemeObject(primitives), null, 2)
}
