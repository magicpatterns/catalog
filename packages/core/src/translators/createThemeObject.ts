import { TTokens } from '@core/types'

import { sanitizeName } from './sanitizeName'

export function createThemeObject({ colorData, typography, shadows }: TTokens) {
  const themeObj = new Map<
    string,
    { [key: string]: string | { [key: string]: string } }
  >()

  const colorObj = new Map<string, { [key: string]: string }>()
  const fontSizeObj = new Map<string, string>()

  colorData.forEach((color) => {
    colorObj.set(sanitizeName(color.name), {
      ...(color.baseColor && { base: color.baseColor }),
      ...color.variants,
    })
  })

  typography.fontSizes.forEach((color) => {
    fontSizeObj.set(sanitizeName(color.name), `${color.value}${color.unit}`)
  })

  themeObj.set('colors', Object.fromEntries(colorObj))
  themeObj.set('fontSizes', Object.fromEntries(fontSizeObj))

  const shadowsObj = new Map<string, string>()

  shadows.forEach((shadow) => {
    shadowsObj.set(sanitizeName(shadow.name), shadow.value)
  })

  themeObj.set('boxShadows', Object.fromEntries(fontSizeObj))

  const rawJsonObject = Object.fromEntries(themeObj)

  return rawJsonObject
}
