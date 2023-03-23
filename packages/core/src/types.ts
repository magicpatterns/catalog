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

export type TTypographyData = {
  fontSizes: TFontSizeVariant[]
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
