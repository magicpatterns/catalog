import { TTypographyData } from '@mirrorful/core/lib/types'
import { StateCreator } from 'zustand'

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
