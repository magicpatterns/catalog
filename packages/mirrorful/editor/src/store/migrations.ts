import Conf from 'conf'
import { TColorData, TConfig, TTypographyData } from 'types'

export const ZeroPointZeroPointTwoMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')

  let newTokens: {
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

export const defaultTypography: TTypographyData = {
  fontSizes: [
    {
      value: 1,
      unit: 'rem',
      name: 'sm',
    },
    {
      value: 1.2,
      unit: 'rem',
      name: 'md',
    },
    {
      value: 1.4,
      unit: 'rem',
      name: 'lg',
    },
  ],
}

export const ZeroPointZeroPointThreeMigration = (store: Conf<TConfig>) => {
  const tokens = store.get('tokens')
  const updatedTokens = { ...tokens }

  updatedTokens.typography = defaultTypography
  store.set('tokens', updatedTokens)
}

export const defaultFiles: TConfig['files'] = [
  'css',
  'scss',
  'js',
  'cjs',
  'ts',
  'json',
]

export const ZeroPointZeroPointFourMigration = (store: Conf<TConfig>) => {
  store.set('files', defaultFiles)
}
