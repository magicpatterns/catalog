import { TPlatform } from '../Layout'

export const getNumberOfStepsInOnboardingFlow = (platform: TPlatform) =>
  platform === 'web' ? `05` : `07`
