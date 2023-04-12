import styled, { createGlobalStyle, DefaultTheme } from 'styled-components'
import { Tokens } from './.mirrorful/theme'

export const GlobalStyles = createGlobalStyle`
    :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: ${Tokens.fontWeights.light};

  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  transition: background-color 0.2s ease-in, color 0.2s ease-in;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 320px;
    min-height: 100vh;
    text-align: center;
  }

  h1 {
  font-size: ${Tokens.fontSizes.xlg};
  line-height: ${Tokens.lineHeights.short};
}

`
export const lightTheme: DefaultTheme = {
  body: Tokens.colors.white[600],
  text: Tokens.colors['dark-bg'].text,
}
export const darkTheme: DefaultTheme = {
  body: Tokens.colors['dark-bg'].base,
  text: Tokens.colors.white[600],
}
