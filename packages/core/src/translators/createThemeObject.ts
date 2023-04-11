import { assertToken, assertTokenGroup, TPrimitives } from '@core/types'

import { sanitizeName } from './sanitizeName'

export function createThemeObject({
  primitives,
  isTailwind,
}: {
  primitives: TPrimitives
  isTailwind?: boolean
}) {
  const { colors, typography, shadows } = primitives
  const themeObj = new Map<
    string,
    { [key: string]: string | { [key: string]: string } }
  >()

  const colorObj = new Map<string, { [key: string]: string }>()
  Object.keys(colors).forEach((colorName) => {
    const color = colors[colorName]
    const currentColorObj = new Map<string, string>()
    if (assertTokenGroup(color)) {
      Object.keys(color).forEach((variantName) => {
        if (variantName === 'base' && isTailwind) {
          currentColorObj.set('DEFAULT', `${color[variantName].value}`)
        } else {
          currentColorObj.set(variantName, `${color[variantName].value}`)
        }
      })
    }
    colorObj.set(sanitizeName(colorName), Object.fromEntries(currentColorObj))
  })
  themeObj.set('colors', Object.fromEntries(colorObj))

  const fontSizeObj = new Map<string, string>()
  Object.keys(typography.fontSizes).forEach((name) => {
    const fontSize = typography.fontSizes[name]
    if (assertToken(fontSize)) {
      fontSizeObj.set(sanitizeName(name), `${fontSize.value}`)
    }
  })
  themeObj.set('fontSizes', Object.fromEntries(fontSizeObj))

  const fontWeightObj = new Map<string, string>()
  Object.keys(typography.fontWeights).forEach((name) => {
    const fontWeight = typography.fontWeights[name]
    if (assertToken(fontWeight)) {
      fontWeightObj.set(sanitizeName(name), `${fontWeight.value}`)
    }
  })
  themeObj.set('fontWeights', Object.fromEntries(fontWeightObj))

  const lineHeightObj = new Map<string, string>()
  Object.keys(typography.lineHeights).forEach((name) => {
    const lineHeight = typography.lineHeights[name]
    if (assertToken(lineHeight)) {
      lineHeightObj.set(sanitizeName(name), `${lineHeight.value}`)
    }
  })
  themeObj.set('lineHeights', Object.fromEntries(lineHeightObj))

  const shadowsObj = new Map<string, string>()
  Object.keys(shadows).forEach((name) => {
    const shadow = shadows[name]
    if (assertToken(shadow)) {
      shadowsObj.set(sanitizeName(name), `${shadow.value}`)
    }
  })
  themeObj.set('boxShadows', Object.fromEntries(fontSizeObj))

  const rawJsonObject = Object.fromEntries(themeObj)
  return rawJsonObject
}
