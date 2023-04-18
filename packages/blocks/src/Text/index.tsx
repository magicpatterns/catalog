import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { IText, Sizes, Weights } from './types'

export function Text(props: IText) {
  const [size, weight] = extractVariant(props.styles)
  // TODO variants success, error, warning, info
  return (
    <ChakraProviderWrapper>
      <ChakraText
        {...props}
        onClick={props.onClick}
        fontSize={size}
        fontWeight={weight}
        backgroundColor={props.bgColor}
        color={props?.color}
        borderRadius={8}
        _hover={{
          backgroundColor: props?.hover?.color,
          color: props?.hover?.backgroundColor,
        }}
      >
        {props.icon ? props.icon : null}
        {props.label}
      </ChakraText>
    </ChakraProviderWrapper>
  )

  function extractVariant(styles: string): [Sizes, Weights] {
    return styles.split('/') as [Sizes, Weights]
  }
}
