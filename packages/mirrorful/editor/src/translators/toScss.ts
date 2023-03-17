import { TTokens } from 'types'
import { getKeys } from 'utils/getKeys'
import { sanitizeName } from './sanitizeName'
import { toCss } from './toCss'

export const toScss = ({ colorData, typography }: TTokens): string => {
  const content: string[] = []

  colorData.forEach((color) => {
    if (color.baseColor) {
      content.push(`$color-${sanitizeName(color.name)}: ${color.baseColor};`)
    }

    getKeys(color.variants).forEach((key) => {
      if (color.variants[key]) {
        content.push(
          `$color-${sanitizeName(color.name)}-${sanitizeName(key)}: ${
            color.variants[key]
          };`
        )
      }
    })
  })

  typography.fontSizes.forEach((fontSize) => {
    content.push(
      `$font-size-${sanitizeName(fontSize.name)}: ${fontSize.value}${
        fontSize.unit
      };`
    )
  })

  content.push('', toCss({ colorData, typography }))

  return content.join('\n')
}
