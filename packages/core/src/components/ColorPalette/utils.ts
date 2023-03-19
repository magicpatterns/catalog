import tinycolor from 'tinycolor2'
import { VALID_CSS_COLORS } from './validCssColors'

export const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``)
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16)
    let r = (decimalColor >> 16) + magnitude
    r > 255 && (r = 255)
    r < 0 && (r = 0)
    let g = (decimalColor & 0x0000ff) + magnitude
    g > 255 && (g = 255)
    g < 0 && (g = 0)
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude
    b > 255 && (b = 255)
    b < 0 && (b = 0)
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`
  } else {
    return hexColor
  }
}

const scaleDiff = 6

export const generateDefaultColorShades = (primary: string) => {
  const tc = tinycolor(primary)

  return {
    50: tinycolor(primary)
      .lighten(scaleDiff * 5)
      .toHexString(),
    100: tinycolor(primary)
      .lighten(scaleDiff * 4)
      .toHexString(),
    200: tinycolor(primary)
      .lighten(scaleDiff * 3)
      .toHexString(),
    300: tinycolor(primary)
      .lighten(scaleDiff * 2)
      .toHexString(),
    400: tinycolor(primary).lighten(scaleDiff).toHexString(),
    500: tinycolor(primary).toHexString(),
    600: tinycolor(primary).darken(scaleDiff).toHexString(),
    700: tinycolor(primary)
      .darken(scaleDiff * 2)
      .toHexString(),
    800: tinycolor(primary)
      .darken(scaleDiff * 3)
      .toHexString(),
    900: tinycolor(primary)
      .darken(scaleDiff * 4)
      .toHexString(),
  }
}

export const handleInvalidColor = (input: string) => {
  const sanitizedInput = input.replace(/ /g, '')

  // Check if input is a valid hex code
  const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  if (hexRegex.test(sanitizedInput)) {
    if (sanitizedInput.startsWith('#')) {
      return sanitizedInput
    } else {
      return `#${sanitizedInput}`
    }
  }

  // Check if input is a valid rgb
  const rgbColorRegex = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/
  if (rgbColorRegex.test(sanitizedInput)) {
    return sanitizedInput
  }

  // Check if input is a valid color name
  const lowerCaseInput = sanitizedInput.toLowerCase()
  if (VALID_CSS_COLORS.includes(lowerCaseInput)) {
    return lowerCaseInput
  }

  // Check if input is a valid subset of a hexcode
  const validSubsetRegex = /^#?[0-9A-Fa-f]{0,6}$/ // regex to validate if input is a valid subset of a hexcode

  let randomHex: String = ''
  for (let i: number = 0; i < 6; i++) {
    randomHex += Math.floor(Math.random() * 16).toString(16) // Generate six random hex digits.
  }

  if (validSubsetRegex.test(sanitizedInput)) {
    // check if input is a valid subset of a hexcode
    if (sanitizedInput.startsWith('#')) {
      return `${sanitizedInput}${randomHex.slice(sanitizedInput.length - 1)}` // use input as the first part and append random characters as necessary to make a valid hexcode
    } else {
      return `#${sanitizedInput}${randomHex.slice(sanitizedInput.length)}` // use input as the first part and append random characters as necessary to make a valid hexcode
    }
  } else {
    return `#${randomHex}` // generate a completely random valid hexcode
  }
}
