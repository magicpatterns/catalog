export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows

export type Token = Colors | FontSize | Shadows

export const Tokens = {
  colors: {
    'button-default': {
      background: '#E2E8F0',
      hover: '#CBD5E0',
    },
    'save-button': {
      hover: '#2B6CB0',
      background: '#3182CE',
    },
    'delete-button': {
      hover: '#C53030',
      background: '#E53E3E',
    },
    'add-new-token': {
      hover: '#2B6CB0',
      background: '#3182CE',
    },
    'add-new-variant': {
      background: '#E2E8F0',
    },
    'icon-button': {
      background: '#E2E8F0',
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeights: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeights: {},
  boxShadows: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
}
