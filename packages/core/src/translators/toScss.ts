import { assertToken, assertTokenGroup, TPrimitives } from '@core/types'

import { sanitizeName } from './sanitizeName'
import { toCss } from './toCss'

export const toScss = (primitives: TPrimitives): string => {
  const { colors, typography, shadows } = primitives
  const content: string[] = []

  Object.keys(colors).forEach((colorName) => {
    const color = colors[colorName]
    if (assertTokenGroup(color)) {
      Object.keys(color).forEach((variantName) => {
        content.push(
          `$color-${sanitizeName(colorName)}-${sanitizeName(variantName)}: ${
            color[variantName].value
          };`
        )
      })
    }
  })

  Object.keys(typography.fontSizes).forEach((name) => {
    const fontSize = typography.fontSizes[name]
    if (assertToken(fontSize)) {
      content.push(`$font-size-${sanitizeName(name)}: ${fontSize.value};`)
    }
  })

  Object.keys(typography.fontWeights).forEach((name) => {
    const fontWeight = typography.fontWeights[name]
    if (assertToken(fontWeight)) {
      content.push(`$font-weight-${sanitizeName(name)}: ${fontWeight.value};`)
    }
  })

  Object.keys(typography.lineHeights).forEach((name) => {
    const lineHeight = typography.lineHeights[name]
    if (assertToken(lineHeight)) {
      content.push(`$line-height-${sanitizeName(name)}: ${lineHeight.value};`)
    }
  })

  Object.keys(shadows).forEach((name) => {
    const shadow = shadows[name]
    if (assertToken(shadow)) {
      content.push(`$box-shadow-${sanitizeName(name)}: ${shadow.value};`)
    }
  })

  content.push('', toCss(primitives))

  return content.join('\n')
}
