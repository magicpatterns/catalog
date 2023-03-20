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

export type TTokens = {
  colorData: TColorData[]
  typography: TTypographyData
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

export const defaultFiles: TConfig['files'] = [
  'css',
  'scss',
  'js',
  'cjs',
  'ts',
  'json',
]
