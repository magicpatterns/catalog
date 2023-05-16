import { StateCreator } from 'zustand'

import { TMetadata } from '../types'

export interface MetadataSlice {
  metadata: TMetadata
  setMetadata: (newState: TMetadata) => void
}
export const createMetadataSlice: StateCreator<
  MetadataSlice,
  [],
  [],
  MetadataSlice
> = (set) => ({
  metadata: {
    completedOnboardings: [],
  },
  setMetadata: (newState) => set(() => ({ metadata: newState })),
})
