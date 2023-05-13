import { resolveTokenValue } from '@core/components/Themes/themeUtils'
import {
  assertToken,
  assertTokenGroup,
  TPrimitives,
  TTheme,
  TToken,
  TTokenGroup,
} from '@core/types'

import { sanitizeName } from './sanitizeName'

export const toCss = (
  { colors, typography, shadows }: TPrimitives,
  themes: TTheme[]
): string => {
  const content = [':root {']

  Object.keys(colors).forEach((colorName) => {
    const color = colors[colorName]
    if (assertTokenGroup(color)) {
      Object.keys(color).forEach((variantName) => {
        content.push(
          `  --color-${sanitizeName(colorName)}-${sanitizeName(variantName)}: ${
            color[variantName].value
          };`
        )
      })
    }
  })

  Object.keys(typography.fontSizes).forEach((name) => {
    const fontSize = typography.fontSizes[name]
    if (assertToken(fontSize)) {
      content.push(`  --font-size-${sanitizeName(name)}: ${fontSize.value};`)
    }
  })

  Object.keys(typography.fontWeights).forEach((name) => {
    const fontWeight = typography.fontWeights[name]
    if (assertToken(fontWeight)) {
      content.push(
        `  --font-weight-${sanitizeName(name)}: ${fontWeight.value};`
      )
    }
  })

  Object.keys(typography.lineHeights).forEach((name) => {
    const lineHeight = typography.lineHeights[name]
    if (assertToken(lineHeight)) {
      content.push(
        `  --line-height-${sanitizeName(name)}: ${lineHeight.value};`
      )
    }
  })

  Object.keys(shadows).forEach((name) => {
    const shadow = shadows[name]
    if (assertToken(shadow)) {
      content.push(`  --box-shadow-${sanitizeName(name)}: ${shadow.value};`)
    }
  })

  content.push(`}`)
  content.push('')

  themes.forEach((theme) => {
    content.push(`html[data-theme='${theme.name}'] {`)

    // Recursively iterate through the theme
    const themeTokens = theme.tokens

    const addNode = (node: TTokenGroup | TToken, path: string) => {
      if (assertTokenGroup(node)) {
        Object.keys(node).forEach((key) => {
          addNode(node[key], path.length > 0 ? `${path}-${key}` : key)
        })
      } else if (assertToken(node)) {
        const resolvedValue = resolveTokenValue({
          value: node.value,
          colors,
        })

        content.push(`  --${path}: ${resolvedValue};`)
      }
    }

    addNode(themeTokens, '')

    content.push('}')
  })

  return content.join('\n')
}
