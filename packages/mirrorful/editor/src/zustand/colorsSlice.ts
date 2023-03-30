import { TColorData } from '@mirrorful/core/lib/types'
import { StateCreator } from 'zustand'

export interface ColorsSlice {
  colors: TColorData[]
  setColors: (newState: TColorData[]) => void
}
export const createColorsSlice: StateCreator<
  ColorsSlice,
  [],
  [],
  ColorsSlice
> = (set) => ({
  colors: [],
  setColors: (newState) => set((state) => ({ colors: newState })),
})
