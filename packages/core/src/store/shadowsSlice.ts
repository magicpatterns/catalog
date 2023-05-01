import { StateCreator } from 'zustand'

import { TTokenGroup } from '../types'

export interface ShadowsSlice {
  shadows: TTokenGroup
  setShadows: (newState: TTokenGroup) => void
}
export const createShadowsSlice: StateCreator<
  ShadowsSlice,
  [],
  [],
  ShadowsSlice
> = (set) => ({
  shadows: {},
  setShadows: (newState) => set(() => ({ shadows: newState })),
})
