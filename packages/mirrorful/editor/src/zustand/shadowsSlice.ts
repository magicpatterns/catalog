import { TShadowData } from '@mirrorful/core/lib/types'
import { StateCreator } from 'zustand'

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
