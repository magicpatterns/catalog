// TODO: Copy pasted from the frontend.
// We need to consolidate the two files

// The top level object for everything
export type TMirrorfulStore = {
  primitives: TPrimitives
  themes: TTheme[]
  files: TExportFileType[]
  metadata: TMetadata
}

// Top level object for storing primitives
export type TPrimitives = {
  colors: TTokenGroup
  typography: TPrimitivesTypography
  shadows: TTokenGroup
}

export type TPrimitivesTypography = {
  fontSizes: TTokenGroup
  fontWeights: TTokenGroup
  lineHeights: TTokenGroup
}

// Each theme, e.g. "Dark Theme"
export type TTheme = {
  id: string
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
  type: TTokenType
  ref?: string // means that this token itself is a reference to another token
}

export type TExportFileType = 'css' | 'scss' | 'js' | 'cjs' | 'ts' | 'json'

export type TTokenType =
  | 'color'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'boxShadow'

export type TMetadata = {
  completedOnboardings: string[]
}
