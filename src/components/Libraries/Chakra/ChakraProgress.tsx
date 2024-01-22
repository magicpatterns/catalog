import { Progress } from '@chakra-ui/react'
import { Flex } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraProgress() {
  return (
    <ChakraWrapper>
      <Progress value={40} css={{ width: '100px' }} />
    </ChakraWrapper>
  )
}

export const chakraProgressData: TComponentData = {
  name: 'Progress',
  library: 'chakra',
  component: <ChakraProgress />,
  tags: ['chakra', 'progress', 'loading'],
  docsLink: 'https://chakra-ui.com/docs/components/progress/usage',
}
