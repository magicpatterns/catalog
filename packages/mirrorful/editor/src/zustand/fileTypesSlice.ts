import { TExportFileType } from '@mirrorful/core/lib/types'
import { StateCreator } from 'zustand'

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
