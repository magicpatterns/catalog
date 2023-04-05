import { StateCreator } from 'zustand'

import { TExportFileType } from '../types'

export interface FileTypesSlice {
  fileTypes: TExportFileType[]
  setFileTypes: (newState: TExportFileType[]) => void
}
export const createFileTypesSlice: StateCreator<
  FileTypesSlice,
  [],
  [],
  FileTypesSlice
> = (set) => ({
  fileTypes: [],
  setFileTypes: (newState) => set(() => ({ fileTypes: newState })),
})
