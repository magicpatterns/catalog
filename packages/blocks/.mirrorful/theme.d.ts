export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows
export type Token = Colors | FontSize | Shadows
export declare const Tokens: {
  colors: {
    'button-default': {
      background: string
      hover: string
    }
    'save-button': {
      hover: string
      background: string
    }
    'delete-button': {
      hover: string
      background: string
    }
    'add-new-token': {
      hover: string
      background: string
    }
    'add-new-variant': {
      background: string
    }
    'icon-button': {
      background: string
    }
  }
  fontSizes: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontWeights: {
    hairline: string
    thin: string
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
    extrabold: string
    black: string
  }
  lineHeights: {}
  boxShadows: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}
