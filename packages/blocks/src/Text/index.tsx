import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { Tokens } from '../../.mirrorful/theme'
import { ChakraProviderWrapper } from '../ThemeProvider'
import { extractVariant } from '../util/extractVariant'
import { IText } from './types'

export function Text(props: IText) {
  const { colors, fontSizes, fontWeights } = Tokens
  const [size, weight] = extractVariant(props.styles)
  const variantsColors: Record<Required<IText>['variants'], string> = {
    error: colors['text-error'].base,
    info: colors['text-info'].base,
    success: colors['text-success'].base,
    warning: colors['text-warning'].base,
  }
  return (
    <ChakraProviderWrapper>
      <ChakraText
        display={props.icon ? 'flex' : 'block'}
        gap={props.icon ? 4 : 0}
        alignItems={props.icon ? 'center' : 'start'}
        onClick={props.onClick}
        fontSize={fontSizes[size]}
        fontWeight={fontWeights[weight]}
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
}
