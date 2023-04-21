import { ChakraProps, Heading as ChakraHeading } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { toCapitalize } from '../util/toCapitalize'
import { Tokens } from '.mirrorful/theme'

interface IHeading
  extends Partial<
    Pick<ChakraProps, 'color' | 'bgColor' | 'textDecoration' | 'textAlign'>
  > {
  label: string
  variants: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  onClick?: () => void
}

export function Heading(props: IHeading) {
  const { fontSizes, fontWeights } = Tokens
  const variantProps: Record<IHeading['variants'], ChakraProps> = {
    h1: { fontSize: fontSizes.h1, fontWeight: fontWeights.black },
    h2: { fontSize: fontSizes.h2, fontWeight: fontWeights.black },
    h3: { fontSize: fontSizes.h3, fontWeight: fontWeights.black },
    h4: { fontSize: fontSizes.h4, fontWeight: fontWeights.black },
    h5: { fontSize: fontSizes.h5, fontWeight: fontWeights.black },
    h6: { fontSize: fontSizes.h6, fontWeight: fontWeights.black },
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
