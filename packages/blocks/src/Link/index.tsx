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
  icon?: React.ReactNode
}

function Link(props: ILink) {
  return (
    <ChakraProviderWrapper>
      <ChakraLink {...props}>{props.label}</ChakraLink>
    </ChakraProviderWrapper>
  )
}

export default Link
