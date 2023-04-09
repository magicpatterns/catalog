import { TTokens } from '@core/types'

import { getlineHeight } from './getLineHeight'
import { sanitizeName } from './sanitizeName'

export function createThemeObject({ colorData, typography, shadows }: TTokens) {
  const themeObj = new Map<
    string,
    { [key: string]: string | { [key: string]: string } }
  >()

  const colorObj = new Map<string, { [key: string]: string }>()
  const fontSizeObj = new Map<string, string>()
  const fontWeightObj = new Map<string, string>()
  const lineHeightObj = new Map<string, string>()

  colorData.forEach((color) => {
    colorObj.set(sanitizeName(color.name), {
      ...(color.baseColor && { base: color.baseColor }),
      ...color.variants,
    })
  })

  typography.fontSizes.forEach((color) => {
    fontSizeObj.set(sanitizeName(color.name), `${color.value}${color.unit}`)
  })

  typography.fontWeights.forEach((fontWeight) => {
    fontWeightObj.set(sanitizeName(fontWeight.name), `${fontWeight.weight}`)
  })

  typography.lineHeights.forEach((lineHeight) => {
    lineHeightObj.set(
      sanitizeName(lineHeight.name),
      `${getlineHeight(lineHeight)}`
    )
  })

  themeObj.set('colors', Object.fromEntries(colorObj))
  themeObj.set('fontSizes', Object.fromEntries(fontSizeObj))
  themeObj.set('fontWeights', Object.fromEntries(fontWeightObj))
  themeObj.set('lineHeights', Object.fromEntries(lineHeightObj))

  const shadowsObj = new Map<string, string>()

  shadows.forEach((shadow) => {
    shadowsObj.set(sanitizeName(shadow.name), shadow.value)
  })

  themeObj.set('boxShadows', Object.fromEntries(shadowsObj))

  const rawJsonObject = Object.fromEntries(themeObj)

  return rawJsonObject
}
