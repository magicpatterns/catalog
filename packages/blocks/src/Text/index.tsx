import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { IText, Sizes, Weights } from './types'

export function Text(props: IText) {
  const [size, weight] = extractVariant(props.styles)
  // TODO variants success, error, warning, info
  const variantsColors: Record<Required<IText>['variants'], string> = {
    error: 'red.400',
    info: 'blue.400',
    success: 'green.400',
    warning: 'orange.400',
  }
  return (
    <ChakraProviderWrapper>
      <ChakraText
        onClick={props.onClick}
        fontSize={size}
        fontWeight={weight}
        backgroundColor={props.bgColor}
        color={props.variants ? variantsColors[props.variants] : props?.color}
        borderRadius={8}
        _hover={{
          backgroundColor: props.variants
            ? variantsColors[props.variants]
            : props?.hover?.color,
          color: props?.hover?.backgroundColor,
        }}
        {...props}
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
