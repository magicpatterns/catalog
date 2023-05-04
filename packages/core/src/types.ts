export type TExportFileType = 'css' | 'scss' | 'js' | 'cjs' | 'ts' | 'json'

export const defaultFiles: TExportFileType[] = [
  'css',
  'scss',
  'js',
  'cjs',
  'ts',
  'json',
]

// NEXT GENERATION DATA MODEL
// Migrating to standardized reference: https://design-tokens.github.io/

// This is empty so that users can sent through onboarding
export const defaultColorsV2: TTokenGroup = {}

export const defaultFontSizesV2: TTokenGroup = {
  sm: {
    id: 'default-font-size-sm-id',
    value: '1rem',
    type: 'fontSize',
    metadata: {
      isBase: false,
    },
  },
  md: {
    id: 'default-font-size-md-id',
    value: '1.2rem',
    type: 'fontSize',
    metadata: {
      isBase: false,
    },
  },
  lg: {
    id: 'default-font-size-lg-id',
    value: '1.4rem',
    type: 'fontSize',
    metadata: {
      isBase: false,
    },
  },
}

export const defaultFontWeightsV2: TTokenGroup = {
  light: {
    id: 'default-font-weight-light-id',
    value: '200',
    type: 'fontWeight',
    metadata: {
      isBase: false,
    },
  },
  normal: {
    id: 'default-font-weight-normal-id',
    value: '400',
    type: 'fontWeight',
    metadata: {
      isBase: false,
    },
  },
  bold: {
    id: 'default-font-weight-bold-id',
    value: '700',
    type: 'fontWeight',
    metadata: {
      isBase: false,
    },
  },
}

export const defaultLineHeightsV2: TTokenGroup = {
  short: {
    id: 'default-line-height-short-id',
    value: '1',
    type: 'lineHeight',
    metadata: {
      isBase: false,
    },
  },
  normal: {
    id: 'default-line-height-normal-id',
    value: '1.5',
    type: 'lineHeight',
    metadata: {
      isBase: false,
    },
  },
  tall: {
    id: 'default-line-height-tall-id',
    value: '2',
    type: 'lineHeight',
    metadata: {
      isBase: false,
    },
  },
}

export const defaultShadowsV2: TTokenGroup = {
  sm: {
    id: 'default-shadow-sm-id',
    value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    type: 'boxShadow',
    metadata: {
      isBase: false,
    },
  },
  md: {
    id: 'default-shadow-md-id',
    value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    type: 'boxShadow',
    metadata: {
      isBase: false,
    },
  },
  lg: {
    id: 'default-shadow-lg-id',
    value:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    type: 'boxShadow',
    metadata: {
      isBase: false,
    },
  },
  'dark-lg': {
    id: 'default-shadow-dark-lg-id',
    value:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    type: 'boxShadow',
    metadata: {
      isBase: false,
    },
  },
}

export const defaultTypographyV2: TPrimitivesTypography = {
  fontSizes: defaultFontSizesV2,
  fontWeights: defaultFontWeightsV2,
  lineHeights: defaultLineHeightsV2,
}

export const defaultConfigV2: TMirrorfulStore = {
  primitives: {
    colors: defaultColorsV2,
    typography: defaultTypographyV2,
    shadows: defaultShadowsV2,
  },
  themes: [],
  files: defaultFiles,
}

// The top level object for everything
export type TMirrorfulStore = {
  primitives: TPrimitives
  themes: TTheme[]
  files: TExportFileType[]
}

export type TPrimitivesTypography = {
  fontSizes: TTokenGroup
  fontWeights: TTokenGroup
  lineHeights: TTokenGroup
}

// Top level object for storing primitives
export type TPrimitives = {
  colors: TTokenGroup
  typography: TPrimitivesTypography
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
  value: string
  type: 'color' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'boxShadow'
  ref?: string // means that this token itself is a reference to another token
  metadata: {
    isBase: boolean
  }
}

export const assertTokenGroup = (
  token: TTokenGroup | TToken
): token is TTokenGroup => {
  return typeof token.id !== 'string'
}

export const assertToken = (token: TTokenGroup | TToken): token is TToken => {
  return typeof token.id === 'string'
}

export type TNamedToken = {
  name: string
  token: TToken
}

export type TNamedTokenGroup = {
  name: string
  group: TTokenGroup
}

export const Units = ['px', 'rem', 'em', '%', 'number'] as const

export type TUnits = (typeof Units)[number]
