import { Button } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraButton() {
  return (
    <ChakraWrapper>
      <Button>Button</Button>
    </ChakraWrapper>
  )
}

export const chakraButtonData: TComponentData = {
  name: 'Button',
  library: 'chakra',
  component: <ChakraButton />,
  tags: ['chakra', 'button'],
  docsLink: 'https://chakra-ui.com/docs/components/button/usage',
}
