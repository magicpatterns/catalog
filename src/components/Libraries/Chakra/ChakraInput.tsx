import { Input } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraInput() {
  return (
    <ChakraWrapper>
      <Input placeholder="Search..." />{' '}
    </ChakraWrapper>
  )
}

export const chakraInputData: TComponentData = {
  name: 'Input',
  library: 'chakra',
  component: <ChakraInput />,
  tags: ['chakra', 'input'],
  docsLink: 'https://chakra-ui.com/docs/components/input/usage',
}
