import { TPlatform } from '../Dashboard'

export const getNumberOfStepsInOnboardingFlow = (platform: TPlatform) =>
  platform === 'web' ? `04` : `06`
