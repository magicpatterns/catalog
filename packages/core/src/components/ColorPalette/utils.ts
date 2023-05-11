import { TTokenGroup } from '@core/types'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'
import { v4 as uuidv4 } from 'uuid'

import { VALID_CSS_COLORS } from './validCssColors'

/* eslint-disable @typescript-eslint/no-unused-expressions */
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

/* convert a text string to a valid hexcolor string. If no valid hexcolor string
  is available, we return the fallback color */
export const parseHexString = (hexString: string, fallback: string) => {
  /* First if the string has a '#' at the start we remove it */
  if (hexString[0] === '#') {
    hexString = hexString.substring(1)
  }

  const hexStringLength = hexString.length
  /* Then we convert the string to 6 characters by trimming or adding characters */
  if (hexStringLength < 6) {
    hexString += new Array(6 - hexStringLength).fill(0).join('')
  }
  hexString = hexString.substring(0, 6)

  /* Now we check if the hexString has any non-hex characters, if it has we cannot parse it
    and we return the fallback color */
  if (!isHexString(hexString)) {
    return fallback
  }

  /* Since the hex representation expects a '#' at the start, we add it back. This will also allow user
    to input numbers without the hash prefix – we auto add the hash.
  */
  hexString = '#' + hexString

  return hexString
}

const isHexString = (str: string) => {
  const regexp = /^[0-9a-fA-F]+$/
  if (regexp.test(str)) {
    return true
  }
  return false
}

/* eslint-enable @typescript-eslint/no-unused-expressions */

const scaleDiff = 7

interface Shades {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}
export type ShadeStop = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export const generateDefaultColorShades = ({
  primary,
  baseStop = 500,
}: {
  primary: AnyColor
  baseStop?: ShadeStop
}) => {
  const format =
    typeof primary === 'string' && primary.includes('#') ? 'HEX' : 'RGBA'

  const shades: Shades = {
    50: '#fff',
    100: '#fff',
    200: '#fff',
    300: '#fff',
    400: '#fff',
    500: '#fff',
    600: '#fff',
    700: '#fff',
    800: '#fff',
    900: '#fff',
  }

  const multiplierDelta: Record<number, number> = {
    0: 1,
    50: 1,
    100: 1.2,
    150: 1.4,
    200: 1.8,
    250: 2.2,
    300: 2.8,
    350: 3.4,
    400: 3.8,
    450: 4.2,
    500: 4.8,
    550: 5.2,
    600: 5.8,
    650: 6.2,
    700: 6.8,
    750: 7.2,
    800: 7.8,
    850: 8.2,
  }

  Object.keys(shades).forEach((key) => {
    // If the key is the basestop, leave it alone
    let v = tinycolor(primary)

    const delta = Math.abs(Number(key) - baseStop)

    const multiplier = multiplierDelta[delta] ?? 1
    console.log('key', key, multiplier)

    if (Number(key) < baseStop) {
      // if it's less than the baseStop, lighten it
      v = tinycolor(primary).lighten(scaleDiff * multiplier)
    } else if (Number(key) > baseStop) {
      // if it's greater than the baseStop, darken it
      v = tinycolor(primary).darken(scaleDiff * multiplier)
    }
    shades[Number(key) as ShadeStop] =
      format === 'HEX' ? v.toHexString() : v.toRgbString()
  })

  return shades
}

export const defaultColorShadesToTokens = (shades: {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}): TTokenGroup => {
  return {
    50: {
      id: uuidv4(),
      value: shades[50],
      type: 'color',
    },
    100: {
      id: uuidv4(),
      value: shades[100],
      type: 'color',
    },
    200: {
      id: uuidv4(),
      value: shades[200],
      type: 'color',
    },
    300: {
      id: uuidv4(),
      value: shades[300],
      type: 'color',
    },
    400: {
      id: uuidv4(),
      value: shades[400],
      type: 'color',
    },
    500: {
      id: uuidv4(),
      value: shades[500],
      type: 'color',
    },
    600: {
      id: uuidv4(),
      value: shades[600],
      type: 'color',
    },
    700: {
      id: uuidv4(),
      value: shades[700],
      type: 'color',
    },
    800: {
      id: uuidv4(),
      value: shades[800],
      type: 'color',
    },
    900: {
      id: uuidv4(),
      value: shades[900],
      type: 'color',
    },
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

  let randomHex = ''
  for (let i = 0; i < 6; i++) {
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
