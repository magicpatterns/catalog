import {
  defaultFiles,
  defaultTypography,
  TColorData,
  TConfig,
  MirrorfulStore,
  TTokenGroup,
  TPrimatives,
} from '@mirrorful/core/lib/types'
import Conf from 'conf'
import { uuid } from 'uuidv4'

export const ZeroPointZeroPointTwoMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')

  const newTokens: {
    colorData: TColorData[]
  } = {
    colorData: [],
  }
  newTokens.colorData = tokens.colorData.map((color: any): TColorData => {
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

export const ZeroPointZeroPointThreeMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')
  const updatedTokens = { ...tokens }

  updatedTokens.typography = defaultTypography
  store.set('tokens', updatedTokens)
}

export const ZeroPointZeroPointFourMigration = (store: Conf<TConfig>) => {
  store.set('files', defaultFiles)
}

export const ZeroPointZeroFiveMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')
  const updatedTokens = { ...tokens }

  updatedTokens.typography = defaultTypography
  store.set('tokens', updatedTokens)
}

export const ZeroPointZeroSixMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')

  const colors: TTokenGroup = {}

  tokens.colorData.forEach((color) => {
    const currentColor: TTokenGroup = {}

    Object.keys(color.variants).forEach((variantName) => {
      currentColor[variantName] = {
        id: uuid(),
        value: color.variants[variantName],
        type: 'color',
      }
    })

    colors[color.name] = currentColor
  })

  const fontSizes: TTokenGroup = {}

  tokens.typography.fontSizes.forEach((variant) => {
    fontSizes[variant.name] = {
      id: uuid(),
      value: `${variant.value}${variant.unit}`,
      type: 'fontSize',
    }
  })

  const fontWeights: TTokenGroup = {}

  tokens.typography.fontWeights.forEach((variant) => {
    fontWeights[variant.name] = {
      id: uuid(),
      value: variant.weight,
      type: 'fontWeight',
    }
  })

  const lineHeights: TTokenGroup = {}
  tokens.typography.lineHeights.forEach((variant) => {
    lineHeights[variant.name] = {
      id: uuid(),
      value: `${variant.value}`,
      type: 'fontWeight',
    }
  })

  const primatives: TPrimatives = {
    colors,
    typography: {
      fontSizes,
      fontWeights,
      lineHeights,
    },
  }

  store.set('primatives', primatives)
  store.delete('tokens')
}
