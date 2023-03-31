import { TPlatform } from '../Dashboard'

export const getNumberOfStepsInOnboardingFlow = (platform: TPlatform) =>
  platform === 'web' ? `05` : `07`
