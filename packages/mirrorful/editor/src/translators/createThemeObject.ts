import { TTokens } from 'types'
import { sanitizeName } from './sanitizeName'

export function createThemeObject({ colorData, typography }: TTokens) {
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

  const rawJsonObject = Object.fromEntries(themeObj)

  return rawJsonObject
}
