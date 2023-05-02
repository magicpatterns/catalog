export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows

export type Token = Colors | FontSize | Shadows

export const Tokens = {
  colors: {
    violet: {
      '50': '#FAF5FF',
      '100': '#E9D8FD',
      '200': '#D6BCFA',
      '300': '#B794F4',
      '400': '#9F7AEA',
      '500': '#805AD5',
      '600': '#6B46C1',
      '700': '#553C9A',
      '800': '#44337A',
      '900': '#322659',
      base: '#805ad5',
    },
    space: {
      '50': '#d1d1d3',
      '100': '#c1c1c4',
      '200': '#b1b2b6',
      '300': '#a1a2a7',
      '400': '#929398',
      '500': '#828389',
      '600': '#73747a',
      '700': '#64656a',
      '800': '#55565a',
      '900': '#46474a',
      base: '#828389',
    },
  },
  fontSizes: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    short: '1',
    normal: '1.5',
    tall: '2',
  },
  boxShadows: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
}
