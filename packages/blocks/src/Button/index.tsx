import { Button as ChakraButton, Icon as ChakraIcon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

export function Button({
  label,
  variant,
  size,
  icon,
}: {
  label: string
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  icon?: IconType
}) {
  let height = '32px'
  let padding = '0 14px'
  let fontSize = '14px'
  if (size === 'md') {
    fontSize = '16px'
    height = '36px'
    padding = '0 24px'
  } else if (size === 'lg') {
    fontSize = '16px'

    height = '40px'
    padding = '0 32px'
  }

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
      css={{
        height,
        fontSize,
        padding,
        lineHeight: 1.2,
      }}
      leftIcon={icon ? <ChakraIcon as={icon} /> : undefined}
    >
      {label}
    </ChakraButton>
  )
}
