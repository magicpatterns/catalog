import { StateCreator } from 'zustand'

import { TShadowData } from '../types'

export interface ShadowsSlice {
  shadows: TShadowData[]
  setShadows: (newState: TShadowData[]) => void
}
export const createShadowsSlice: StateCreator<
  ShadowsSlice,
  [],
  [],
  ShadowsSlice
> = (set) => ({
  shadows: [],
  setShadows: (newState) => set(() => ({ shadows: newState })),
})
