import { Button as ChakraButton } from '@chakra-ui/react'

export function Button({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return <ChakraButton onClick={onClick}>{label}</ChakraButton>
}
