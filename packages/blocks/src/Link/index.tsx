import { ChakraProps, ChakraTheme, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

interface ILink
  extends Partial<
    Pick<ChakraProps, 'bgColor' | 'color' | 'textDecoration' | 'textAlign'>
  > {
  label: string
  href: string
  as: 'a' | typeof NextLink
  target?: '_blank' | '_parent' | '_top' | '_self'
  icon?: React.ReactNode
}

export function Link(props: ILink) {
  return (
    <ChakraProviderWrapper>
      <ChakraLink
        css={{ display: 'flex', gap: 8, alignItems: 'center' }}
        {...props}
      >
        {props.icon}
        {props.label}
      </ChakraLink>
    </ChakraProviderWrapper>
  )
}
