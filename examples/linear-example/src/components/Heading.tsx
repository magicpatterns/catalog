import { Tokens } from '../../.mirrorful/theme'
import { Heading as ChakraHeading } from '@chakra-ui/react'
import { CSSProperties } from 'react'

export function Heading({
  text,
  size,
  style,
}: {
  text: string
  size: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}) {
  let ele = 'h1'
  let fontSize = '48px'
  if (size === 'md') {
    ele = 'h2'
    fontSize = '36px'
  } else if (size === 'sm') {
    ele = 'h3'
    fontSize = '28px'
  }

  return (
    <ChakraHeading
      bgGradient={`linear(to-br, white, white, ${Tokens.background.base})`}
      bgClip="text"
      style={style}
      variant={ele}
      fontSize={fontSize}
    >
      {text}
    </ChakraHeading>
  )
}
