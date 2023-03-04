import { Tokens } from '../../.mirrorful/theme'
import { Text as ChakraText } from '@chakra-ui/react'
import { CSSProperties } from 'react'

export function Text({
  children,
  size,
  style,
}: {
  children: string | React.ReactNode
  size: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}) {
  let fontSize = '22px'
  if (size === 'md') {
    fontSize = '18px'
  } else if (size === 'sm') {
    fontSize = '14px'
  }

  return (
    <ChakraText style={style} fontSize={fontSize}>
      {children}
    </ChakraText>
  )
}
