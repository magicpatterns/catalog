export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows

export type Token = Colors | FontSize | Shadows

export const Tokens = {
  colors: {},
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  boxShadows: {},
}
