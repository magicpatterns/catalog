import { StateCreator } from 'zustand'

import { TTheme } from '../types'

export interface ThemesSlice {
  themes: TTheme[]
  setThemes: (newState: TTheme[]) => void
}
export const createThemesSlice: StateCreator<
  ThemesSlice,
  [],
  [],
  ThemesSlice
> = (set) => ({
  themes: [],
  setThemes: (newState) => set(() => ({ themes: newState })),
})
