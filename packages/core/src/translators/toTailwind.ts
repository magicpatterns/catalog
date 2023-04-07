import { TTokens } from '@core/types'
import { getKeys } from '@core/utils/getKeys'
import JSON5 from 'json5'

export const toTailwind = ({
  colorData,
  typography,
  shadows,
}: TTokens): string => {
  const theme: Record<string, any> = {}

  if (colorData) {
    theme.colors = colorData.reduce<Record<string, any>>((acc, color) => {
      acc[color.name.toLowerCase()] = {
        ...color.variants,
        DEFAULT: color.baseColor,
      }

      return acc
    }, {})
  }

  if (typography) {
    theme.fontSize = typography.fontSizes.reduce<Record<string, string>>(
      (acc, font) => {
        acc[font.name] = `${font.value}${font.unit}`
        return acc
      },
      {}
    )
  }

  if (shadows) {
    theme.boxShadow = shadows.reduce<Record<string, string>>((acc, shadow) => {
      acc[shadow.name] = shadow.value
      return acc
    }, {})
  }

  const tailwindTheme = { theme }
  return `module.exports = ${JSON5.stringify(tailwindTheme, { space: 2 })}`
}
