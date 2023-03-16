import { Tokens } from '../../.mirrorful/theme'
import { Button as ChakraButton } from '@chakra-ui/react'
import { CSSProperties } from 'react'

export function Button({
  label,
  style,
}: {
  label: string
  style?: CSSProperties
}) {
  return (
    <ChakraButton
      borderRadius={'30px'}
      bgGradient={`linear(to-r, ${Tokens.blue.base}, ${Tokens.purple.base})`}
      _hover={{
        boxShadow: `0 0 20px 3px ${Tokens.blue.shades['400']}`,
      }}
      color={'white'}
      height={'34px'}
      paddingX={'28px'}
      fontSize={'12px'}
      fontWeight={'medium'}
      style={style}
    >
      {label}
    </ChakraButton>
  )
}
