import { StateCreator } from 'zustand'

import { TTypographyData } from '../types'

export interface TypographySlice {
  typography: TTypographyData
  setTypography: (newState: TTypographyData) => void
}
export const createTypographySlice: StateCreator<
  TypographySlice,
  [],
  [],
  TypographySlice
> = (set) => ({
  typography: { fontSizes: [] },
  setTypography: (newState) => set(() => ({ typography: newState })),
})