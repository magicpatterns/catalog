import styled from 'styled-components'
import { Tokens } from './.mirrorful/theme' // import the Token from mirrorful theme

const StyledButton = styled.button`
  border-radius: 8px;
  border: none;
  padding: 0.6em 1.2em;
  font-size: ${Tokens.fontSizes.sm};
  font-weight: ${Tokens.fontWeights.bold};
  font-family: inherit;
  color: ${Tokens.colors.white.base};
  cursor: pointer;
  transition: background-color 500ms;
`

export const StyledPrimaryButton = styled(StyledButton)`
  background-color: ${Tokens.colors.purple.base};

  &:hover {
    background-color: ${Tokens.colors.purple[900]};
  }
`

export const StyledSecondaryButton = styled(StyledButton)`
  background-color: ${Tokens.colors.secondary.base};
  margin-left: 8px;
  &:hover {
    background-color: ${Tokens.colors.secondary[900]};
  }
`

export const StyledContainter = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
