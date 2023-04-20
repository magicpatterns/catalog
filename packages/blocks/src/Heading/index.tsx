import { ChakraProps, Heading as ChakraHeading } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { toCapitalize } from '../util/toCapitalize'

interface IHeading
  extends Partial<
    Pick<ChakraProps, 'color' | 'bgColor' | 'textDecoration' | 'textAlign'>
  > {
  label: string
  variants: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onClick?: () => void
}

export function Heading(props: IHeading) {
  const variantProps: Record<IHeading['variants'], ChakraProps> = {
    h1: { fontSize: '2.5rem', fontWeight: 'black' },
    h2: { fontSize: '2.1rem', fontWeight: 'black' },
    h3: { fontSize: '1.8rem', fontWeight: 'black' },
    h4: { fontSize: '1.5rem', fontWeight: 'black' },
    h5: { fontSize: '1.3rem', fontWeight: 'black' },
    h6: { fontSize: '1.1rem', fontWeight: 'black' },
  }
  return (
    <ChakraProviderWrapper>
      <ChakraHeading {...variantProps[props.variants]} {...props}>
        {toCapitalize(props.label)}
      </ChakraHeading>
    </ChakraProviderWrapper>
  )
}

export default Heading
