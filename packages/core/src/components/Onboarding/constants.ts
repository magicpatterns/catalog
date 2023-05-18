import { TPlatform } from '../Layout'

export const getNumberOfStepsInOnboardingFlow = (platform: TPlatform) =>
  platform === 'web' ? `04` : `06`
