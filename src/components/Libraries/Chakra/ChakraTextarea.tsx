import { Textarea } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraTextarea() {
  return (
    <ChakraWrapper>
      <Textarea placeholder="Here is a sample placeholder" />
    </ChakraWrapper>
  )
}

export const chakraTextareaData: TComponentData = {
  name: 'Textarea',
  library: 'chakra',
  component: <ChakraTextarea />,
  tags: ['chakra', 'text', 'area', 'textarea', 'input'],
  docsLink: 'https://chakra-ui.com/docs/components/textarea/usage',
}
