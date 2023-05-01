export type Colors = keyof typeof Tokens.colors
export type FontSize = keyof typeof Tokens.fontSizes
export type Shadows = keyof typeof Tokens.boxShadows

export type Token = Colors | FontSize | Shadows

export const Tokens = {
  colors: {
    'medium-purple': {
      '50': '#ffffff',
      '100': '#f4effc',
      '200': '#ddd0f8',
      '300': '#c7b1f3',
      '400': '#b599ef',
      '500': '#9f7aea',
      '600': '#895be5',
      '700': '#6124dc',
      '800': '#531ebe',
      '900': '#46199f',
      base: '#9F7AEA',
    },
    'yellow-green': {
      '50': '#ffffff',
      '100': '#f9fcef',
      '200': '#edf8d0',
      '300': '#e1f3b1',
      '400': '#d7ef99',
      '500': '#cbea7a',
      '600': '#bfe55b',
      '700': '#a9dc24',
      '800': '#92be1e',
      '900': '#7a9f19',
      base: '#cbea7a',
    },
    'algae-green': {
      '50': '#ffffff',
      '100': '#effcf5',
      '200': '#d0f8e3',
      '300': '#b1f3d0',
      '400': '#99efc1',
      '500': '#7aeaae',
      '600': '#5be59b',
      '700': '#24dc79',
      '800': '#1ebe68',
      '900': '#199f58',
      base: '#7aeaae',
    },
    'deep-blush': {
      '50': '#ffffff',
      '100': '#fceff3',
      '200': '#f8d0dc',
      '300': '#f3b1c5',
      '400': '#ef99b3',
      '500': '#ea7a9c',
      '600': '#e55b85',
      '700': '#dc245c',
      '800': '#be1e4f',
      '900': '#9f1942',
      base: '#ea7a9c',
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
