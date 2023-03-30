import {
  TExportFileType,
  TFontSizeVariant,
  TTypographyData,
} from '@mirrorful/core/lib/types'
import { StateCreator } from 'zustand'

export interface TypographySlice extends TTypographyData {
  setFontSizes: (newState: TFontSizeVariant[]) => void
}
export const createTypographySlice: StateCreator<
  TypographySlice,
  [],
  [],
  TypographySlice
> = (set) => ({
  fontSizes: [],
  setFontSizes: (newState) => set((state) => ({ fontSizes: newState })),
})
