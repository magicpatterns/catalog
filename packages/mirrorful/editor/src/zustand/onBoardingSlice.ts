import { StateCreator } from 'zustand'

export interface onBoardingSlice {
  shouldForceSkipOnboarding: boolean
  showOnBoarding: boolean
  setShowOnBoarding: (newState: boolean) => void
  setShouldForceSkipOnboarding: (newState: boolean) => void
}
export const createonBoardingSlice: StateCreator<
  onBoardingSlice,
  [],
  [],
  onBoardingSlice
> = (set) => ({
  shouldForceSkipOnboarding: false,
  showOnBoarding: false,
  setShouldForceSkipOnboarding: (newState) =>
    set((state) => ({ ...state, shouldForceSkipOnboarding: newState })),
  setShowOnBoarding: (newState) =>
    set((state) => ({ ...state, showOnBoarding: newState })),
})
