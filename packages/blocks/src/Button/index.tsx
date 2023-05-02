import { Button as ChakraButton } from '@chakra-ui/react'

export function Button({
  label,
  variant,
}: {
  label: string
  variant: 'primary' | 'secondary' | 'ghost'
}) {
  return (
    <ChakraButton
      backgroundImage={`linear-gradient(to bottom right, var(--button-${variant}-bg-color), var(--button-${variant}-bg-color-accent))`}
      _hover={{
        backgroundImage: `linear-gradient(to bottom right, var(--button-${variant}-bg-color-accent), var(--button-${variant}-bg-color))`,
      }}
      _active={{
        backgroundImage: `linear-gradient(to bottom right, var(--button-${variant}-bg-color-accent), var(--button-${variant}-bg-color))`,
      }}
      color={`var(--button-${variant}-text-color)`}
    >
      {label}
    </ChakraButton>
  )
}
