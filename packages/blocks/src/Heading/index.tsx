import { ChakraProps, Heading as ChakraHeading } from '@chakra-ui/react'
import React from 'react'

import { toCapitalize } from '../util/toCapitalize'

type THeading = {
  label: string
  variants: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onClick?: () => void
}

export function Heading(props: THeading) {
  const variantProps: Record<THeading['variants'], ChakraProps> = {
    h1: { fontSize: '2.5rem', fontWeight: 'black' },
    h2: { fontSize: '2rem', fontWeight: 'black' },
    h3: {},
    h4: {},
    h5: {},
    h6: {},
  }
  return (
    <ChakraHeading {...variantProps[props.variants]}>
      {toCapitalize(props.label)}
    </ChakraHeading>
  )
}

export default Heading
