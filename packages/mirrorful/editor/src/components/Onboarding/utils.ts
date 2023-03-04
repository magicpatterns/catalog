import tinycolor from 'tinycolor2'
import { TColorData } from 'types'

const nameThatColor = ({ h, l, s }: { h: number; l: number; s: number }) => {
  if (s <= 0.1 && l >= 0.9) {
    return 'White'
  } else if (l <= 0.15) {
    return 'Black'
  } else if ((s <= 0.1 && l <= 0.7) || s === 0) {
    return 'Gray'
  } else if ((h >= 0 && h <= 15) || h >= 346) {
    return 'Red'
  } else if (h >= 16 && h <= 35) {
    if (s < 0.9) {
      return 'Brown'
    } else {
      return 'Orange'
    }
  } else if (h >= 36 && h <= 54) {
    if (s < 0.9) {
      return 'Brown'
    } else {
      return 'Yellow'
    }
  } else if (h >= 55 && h <= 165) {
    return 'Green'
  } else if (h >= 166 && h <= 260) {
    return 'Blue'
  } else if (h >= 261 && h <= 290) {
    return 'Purple'
  } else if (h >= 291 && h <= 345) {
    return 'Pink'
  }

  return 'Unknown'
}

const shuffleArray = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const normalizeHue = (hue: number): number => {
  if (hue >= 360) {
    return hue - 360
  }

  if (hue < 0) {
    return 360 + hue
  }

  return hue
}

export function generatePalette(
  color: string,
  primaryName: string
): TColorData[] {
  const colors = tinycolor(color).tetrad()
  colors.shift()
  shuffleArray(colors)

  const randomizedColors: TColorData[] = []

  colors.forEach((c, index) => {
    const hslColor = tinycolor(c).toHsl()

    const modifiedHsl = {
      ...hslColor,
      h: hslColor.h + Math.random() * 50 - 25,
    }

    randomizedColors.push({
      name: nameThatColor(modifiedHsl),
      baseColor: tinycolor(modifiedHsl).toHexString(),
      variants: {
        '500': tinycolor(modifiedHsl).toHexString(),
      },
    })
  })

  // Dedupe any names
  const nameSet = new Set<string>()
  nameSet.add(primaryName)

  randomizedColors.forEach((color) => {
    // Name already exists
    if (nameSet.has(color.name)) {
      let index = 2
      while (nameSet.has(`${color.name} ${index}`)) {
        index += 1
      }
      color.name = `${color.name} ${index}`
    }

    nameSet.add(color.name)
  })
  return randomizedColors
}
