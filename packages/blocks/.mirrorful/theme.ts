export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows

export type Token = Colors | FontSize | Shadows

export const Tokens = {
  colors: {
    'button-default': {
      background: '#E2E8F0',
      'bg hover': '#CBD5E0',
    },
    'save-button': {
      background: '#3182CE',
      color: '#FFFFFF',
      'bg hover': '#2B6CB0',
    },
    'delete-button': {
      background: '#E53E3E',
      color: '#FFFFFF',
      'bg hover': '#C53030',
    },
    'add-new-token': {
      color: '#3182CE',
      border: '#3182CE',
      'border hover': '#2B6CB0',
      'color hover': '#2B6CB0',
    },
    'add-new-variant': {
      border: '#E2E8F0',
      'bg hover': '#E2E8F0',
    },
    'icon-button': {
      border: '#E2E8F0',
      'bg hover': '#E2E8F0',
    },
    'default-color': {
      base: '#1A202C',
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
