import {
  defaultFiles,
  TPrimitives,
  TToken,
  TTokenGroup,
} from '@mirrorful/core/lib/types'
import Conf from 'conf'
import { v4 as uuidv4 } from 'uuid'

export const ZeroPointZeroPointTwoMigration = (store: Conf<any>) => {
  const isNewData = store.get('primitives') !== undefined
  if (isNewData) {
    return
  }

  const tokens = store.get('tokens')

  const newTokens: {
    colorData: any[]
  } = {
    colorData: [],
  }
  newTokens.colorData = tokens.colorData.map((color: any): any => {
    const variants = new Map<string, string>()
    if (color.hover) {
      variants.set('Hover', color.hover)
    }

    if (color.active) {
      variants.set('Active', color.active)
    }

    if (color.shades) {
      variants.set('50', color.shades['50'])
      variants.set('100', color.shades['100'])
      variants.set('200', color.shades['200'])
      variants.set('300', color.shades['300'])
      variants.set('400', color.shades['400'])
      variants.set('500', color.shades['500'])
      variants.set('600', color.shades['600'])
      variants.set('700', color.shades['700'])
      variants.set('800', color.shades['800'])
      variants.set('900', color.shades['900'])
    }

    return {
      name: color.name,
      baseColor: color.base,
      variants: Object.fromEntries(variants),
    }
  })

  store.set('tokens', newTokens)
}

export const ZeroPointZeroPointThreeMigration = (store: Conf<any>) => {
  const isNewData = store.get('primitives') !== undefined
  if (isNewData) {
    return
  }
  const tokens = store.get('tokens')
  const updatedTokens = { ...tokens }

  updatedTokens.typography = {}
  store.set('tokens', updatedTokens)
}

export const ZeroPointZeroPointFourMigration = (store: Conf<any>) => {
  const isNewData = store.get('primitives') !== undefined
  if (isNewData) {
    return
  }
  store.set('files', defaultFiles)
}

export const ZeroPointZeroFiveMigration = (store: Conf<any>) => {
  const isNewData = store.get('primitives') !== undefined
  if (isNewData) {
    return
  }
  const tokens = store.get('tokens')
  const updatedTokens = { ...tokens }

  updatedTokens.typography = {}
  store.set('tokens', updatedTokens)
}

export const ZeroPointZeroSevenMigration = (store: Conf<any>) => {
  const primitives = store.get('primitives')

  const colorsObj = primitives['colors']

  const newColors: { [x: string]: { [x: string]: TToken } } = {}

  Object.keys(colorsObj).forEach((key) => {
    // key is the color name
    const namedColor = colorsObj[key]
    // example of namedColor: { 500: TToken, 600: TToken } }
    const newNamedColor: { [x: string]: TToken } = {}
    let has500 = false
    Object.keys(namedColor).forEach((key) => {
      // ex: key would be "400"

      // rename to DEFAULT
      if (key === 'base') {
        delete Object.assign(newNamedColor, namedColor, {
          ['DEFAULT']: namedColor['base'],
        })['base']
      } else if (key === 'BASE') {
        delete Object.assign(newNamedColor, namedColor, {
          ['DEFAULT']: namedColor['BASE'],
        })['BASE']
      } else if (key === '500') {
        has500 = true
        delete Object.assign(newNamedColor, namedColor, {
          ['DEFAULT']: namedColor['500'],
        })['500']
      }
    })
    if (has500) {
      // 500 is special case, we just want to duplicate it
      newNamedColor['500'] = newNamedColor['DEFAULT']
    }

    // if we didn't rename key in algo, then just choose middle one
    if (newNamedColor['DEFAULT'] === undefined) {
      const arr = Object.keys(namedColor)
      const middleKey = arr[(arr.length / 2) | 0]
      Object.assign(newNamedColor, namedColor)
      newNamedColor['DEFAULT'] = namedColor[middleKey]
    }
    newColors[key] = newNamedColor
  })

  const newPrimitives: TPrimitives = {
    ...primitives,
    colors: newColors,
  }

  store.set('primitives', newPrimitives)
}

export const ZeroPointZeroSixMigration = (anyStore: Conf<any>) => {
  const isNewData = anyStore.get('primitives') !== undefined
  if (isNewData) {
    return
  }
  const store = anyStore as Conf<any>

  const tokens = store.get('tokens')

  const colors: TTokenGroup = {}

  tokens.colorData.forEach((color: any) => {
    const currentColor: TTokenGroup = {}

    Object.keys(color.variants).forEach((variantName) => {
      currentColor[variantName] = {
        id: uuidv4(),
        value: color.variants[variantName],
        type: 'color',
      }
    })

    if (color.baseColor) {
      currentColor.base = {
        id: uuidv4(),
        value: color.baseColor,
        type: 'color',
      }
    }

    colors[color.name] = currentColor
  })

  const fontSizes: TTokenGroup = {}

  tokens.typography.fontSizes.forEach((variant: any) => {
    fontSizes[variant.name] = {
      id: uuidv4(),
      value: `${variant.value}${variant.unit}`,
      type: 'fontSize',
    }
  })

  const fontWeights: TTokenGroup = {}

  tokens.typography.fontWeights.forEach((variant: any) => {
    fontWeights[variant.name] = {
      id: uuidv4(),
      value: variant.weight,
      type: 'fontWeight',
    }
  })

  const lineHeights: TTokenGroup = {}
  tokens.typography.lineHeights.forEach((variant: any) => {
    lineHeights[variant.name] = {
      id: uuidv4(),
      value: `${variant.value}`,
      type: 'fontWeight',
    }
  })

  const shadows: TTokenGroup = {}
  tokens.shadows.forEach((variant: any) => {
    shadows[variant.name] = {
      id: uuidv4(),
      value: variant.value,
      type: 'boxShadow',
    }
  })

  const primitives: TPrimitives = {
    colors,
    typography: {
      fontSizes,
      fontWeights,
      lineHeights,
    },
    shadows,
  }

  store.set('primitives', primitives)
  store.delete('tokens')
}
