import { StateCreator } from 'zustand'

export interface InternalSlice {
  isLoaded: boolean
  onLoad: () => void
}
export const createInternalSlice: StateCreator<
  InternalSlice,
  [],
  [],
  InternalSlice
> = (set) => ({
  isLoaded: false,
  onLoad: () => set(() => ({ isLoaded: true })),
})
