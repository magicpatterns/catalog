import { TTokens } from '@core/types'
import { getKeys } from '@core/utils/getKeys'

import { getlineHeight } from './getLineHeight'
import { sanitizeName } from './sanitizeName'
import { toCss } from './toCss'

export const toScss = ({ colorData, typography, shadows }: TTokens): string => {
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

  typography.fontWeights.forEach((fontWeight) => {
    content.push(
      `$font-weight-${sanitizeName(fontWeight.name)}: ${fontWeight.weight};`
    )
  })

  typography.lineHeights.forEach((lineHeight) => {
    content.push(
      `$line-height-${sanitizeName(lineHeight.name)}: ${getlineHeight(
        lineHeight
      )};`
    )
  })

  shadows.forEach((shadow) => {
    content.push(`$font-size-${sanitizeName(shadow.name)}: ${shadow.value};`)
  })

  content.push('', toCss({ colorData, typography, shadows }))

  return content.join('\n')
}
