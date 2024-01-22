import { Code } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraCode() {
  return (
    <ChakraWrapper>
      <Code>Hello world</Code>
    </ChakraWrapper>
  )
}

export const chakraCodeData: TComponentData = {
  name: 'Code',
  library: 'chakra',
  component: <ChakraCode />,
  tags: ['chakra', 'code'],
  docsLink: 'https://chakra-ui.com/docs/components/code/usage',
}
