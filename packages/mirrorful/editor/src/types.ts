export type TColorData = {
  id: string
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
