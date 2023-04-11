import { StateCreator } from 'zustand'

import { TTokenGroup } from '../types'

export interface ColorsSlice {
  colors: TTokenGroup
  setColors: (newState: TTokenGroup) => void
}
export const createColorsSlice: StateCreator<
  ColorsSlice,
  [],
  [],
  ColorsSlice
> = (set) => ({
  colors: {},
  setColors: (newState) => set(() => ({ colors: newState })),
})
