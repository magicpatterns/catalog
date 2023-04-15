import { Button as ChakraButton } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

export function Button({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <ChakraProviderWrapper>
      <ChakraButton onClick={onClick}>{label}</ChakraButton>
    </ChakraProviderWrapper>
  )
}
