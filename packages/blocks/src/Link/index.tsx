import { ChakraProps, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { Tokens } from '../../.mirrorful/theme'
import { Styles } from '../shared/types'

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
  const { fontSizes, fontWeights } = Tokens
  return (
    <ChakraLink
      css={{ display: 'flex', gap: 8, alignItems: 'center' }}
      {...props}
    >
      {props.icon}
      {props.label}
    </ChakraLink>
  )
}
