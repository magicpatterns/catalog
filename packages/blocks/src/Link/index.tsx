import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

/**
 * The link component.
 * @param isExternal - If true, the link will open in a new tab.
 * @returns
 */
export function Link({
  label,
  href,
  isExternal = false,
}: {
  label: string
  href: string
  isExternal?: boolean
}) {
  return (
    <ChakraLink
      as={NextLink}
      isExternal={isExternal}
      href={href}
      color={`var(--primary-color)`}
      fontWeight={`var(--font-weight-bold)`}
    >
      {label}
    </ChakraLink>
  )
}
