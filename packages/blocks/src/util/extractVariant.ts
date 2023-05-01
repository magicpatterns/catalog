import { Sizes, Weights } from '@ui/shared/types'

export function extractVariant(styles?: string): [Sizes, Weights] {
  if (styles === undefined) return ['md', 'normal']
  return styles.split('/') as [Sizes, Weights]
}
