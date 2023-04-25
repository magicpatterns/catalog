import { ChakraProps, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { Styles } from '../shared/types'
import { extractVariant } from '../util/extractVariant'

interface ILink
  extends Partial<
    Pick<
      ChakraProps,
      'bgColor' | 'color' | 'textDecoration' | 'textAlign' | 'width'
    >
  > {
  label: string
  href: string
  as: 'a' | typeof NextLink
  variants?: Styles
  target?: '_blank' | '_parent' | '_top' | '_self'
  icon?: React.ReactNode
}

export function Link(props: ILink) {
  const [Size, Weight] = extractVariant(props.variants ?? '')
  return (
    <ChakraProviderWrapper>
      <ChakraLink
        css={{ display: 'flex', gap: 8, alignItems: 'center' }}
        fontSize={Size}
        fontWeight={Weight}
        {...props}
      >
        {props.icon}
        {props.label}
      </ChakraLink>
    </ChakraProviderWrapper>
  )
}
