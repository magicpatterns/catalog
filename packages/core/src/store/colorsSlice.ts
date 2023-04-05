import { StateCreator } from 'zustand'

import { TColorData } from '../types'

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
  setColors: (newState) => set(() => ({ colors: newState })),
})
