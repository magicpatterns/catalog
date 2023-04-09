import { uuid } from 'uuidv4'

export type TColorData = {
  name: string
  baseColor?: string
  variants: {
    [key: string]: string
  }
}

export type TColorVariant = {
  name: string
  color: string
  isBase: boolean
}

export type TFontSizeVariant = {
  name: string
  value: number
  unit: 'px' | 'rem' | 'em'
}

export type TFontWeightVariant = {
  name: string
  weight: number
}

export type TLineHeightVariant = {
  name: string
  value: number
  unit: 'number' | 'length' | 'percent'
  lengthUnit?: 'px' | 'rem' | 'em'
}

export type TTypographyData = {
  fontSizes: TFontSizeVariant[]
  fontWeights: TFontWeightVariant[]
  lineHeights: TLineHeightVariant[]
}

export type TShadowData = {
  name: string
  value: string
}

export type TTokens = {
  colorData: TColorData[]
  typography: TTypographyData
  shadows: TShadowData[]
}

export type TExportFileType = 'css' | 'scss' | 'js' | 'cjs' | 'ts' | 'json'

export type TConfig = {
  tokens: TTokens
  files: TExportFileType[]
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
  fontWeights: [
    {
      name: 'bold',
      weight: 700,
    },
  ],
  lineHeights: [
    {
      name: 'normal',
      value: 1.5,
      unit: 'number',
    },
    {
      name: 'shorter',
      value: 1,
      unit: 'number',
    },
    {
      name: 'taller',
      value: 2,
      unit: 'number',
    },
  ],
}

export const defaultShadows: TShadowData[] = [
  {
    name: 'sm',
    value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  {
    name: 'md',
    value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  {
    name: 'lg',
    value:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  {
    name: 'dark-lg',
    value:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
]

export const defaultFiles: TConfig['files'] = [
  'css',
  'scss',
  'js',
  'cjs',
  'ts',
  'json',
]

export const defaultConfig: TConfig = {
  tokens: {
    colorData: [],
    typography: defaultTypography,
    shadows: defaultShadows,
  },
  files: defaultFiles,
}

// NEXT GENERATION DATA MODEL
// Migrating to standardized reference: https://design-tokens.github.io/

export const defaultColorsV2: TTokenGroup = {
  purple: {
    DEFAULT: {
      id: 'default-purple-id',
      value: '#6B46C1',
      type: 'color',
    },
  },
}

export const defaultFontSizesV2: TTokenGroup = {
  sm: {
    id: 'default-font-size-sm-id',
    value: '1rem',
    type: 'fontSize',
  },
  md: {
    id: 'default-font-size-md-id',
    value: '1.2rem',
    type: 'fontSize',
  },
  lg: {
    id: 'default-font-size-lg-id',
    value: '1.4rem',
    type: 'fontSize',
  },
}

export const defaultFontWeightsV2: TTokenGroup = {
  light: {
    id: 'default-font-weight-light-id',
    value: 200,
    type: 'fontWeight',
  },
  normal: {
    id: 'default-font-weight-normal-id',
    value: 400,
    type: 'fontWeight',
  },
  bold: {
    id: 'default-font-weight-bold-id',
    value: 700,
    type: 'fontWeight',
  },
}

export const defaultLineHeightsV2: TTokenGroup = {
  short: {
    id: 'default-line-height-short-id',
    value: 1,
    type: 'lineHeight',
  },
  normal: {
    id: 'default-line-height-normal-id',
    value: 1.5,
    type: 'lineHeight',
  },
  tall: {
    id: 'default-line-height-tall-id',
    value: 2,
    type: 'lineHeight',
  },
}

export const defaultShadowsV2: TTokenGroup = {
  sm: {
    id: 'default-shadow-sm-id',
    value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    type: 'boxShadow',
  },
  md: {
    id: 'default-shadow-md-id',
    value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    type: 'boxShadow',
  },
  lg: {
    id: 'default-shadow-lg-id',
    value:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    type: 'boxShadow',
  },
  'dark-lg': {
    id: 'default-shadow-dark-lg-id',
    value:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    type: 'boxShadow',
  },
}

export const defaultConfigV2: MirrorfulStore = {
  primitives: {
    colors: defaultColorsV2,
    typography: {
      fontSizes: defaultFontSizesV2,
      fontWeights: defaultFontWeightsV2,
      lineHeights: defaultLineHeightsV2,
    },
    shadows: defaultShadowsV2,
  },
  themes: [],
  files: defaultFiles,
}

// The top level object for everything
export type MirrorfulStore = {
  primitives: TPrimitives
  themes: TTheme[]
  files: TExportFileType[]
}

// Top level object for storing primitives
export type TPrimitives = {
  colors: TTokenGroup
  typography: {
    fontSizes: TTokenGroup
    fontWeights: TTokenGroup
    lineHeights: TTokenGroup
  }
  shadows: TTokenGroup
}

// Top level object for storing the themes
export type ThemeStore = {
  themes: TTheme[]
}

// Each theme, e.g. "Dark Theme"
export type TTheme = {
  name: string
  tokens: TTokenGroup
}

// The basic unit for constructing a JSON shape
export type TTokenGroup = {
  [key: string]: TTokenGroup | TToken
}

export type TToken = {
  id: string
  value: string | number
  type: 'color' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'boxShadow'
  ref?: string // means that this token itself is a reference to another token
}
