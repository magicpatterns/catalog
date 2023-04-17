import { StateCreator } from 'zustand'

import { TPrimitivesTypography } from '../types'

export interface TypographySlice {
  typography: TPrimitivesTypography
  setTypography: (newState: TPrimitivesTypography) => void
}
export const createTypographySlice: StateCreator<
  TypographySlice,
  [],
  [],
  TypographySlice
> = (set) => ({
  typography: { fontSizes: {}, fontWeights: {}, lineHeights: {} },
  setTypography: (newState) => set(() => ({ typography: newState })),
})
