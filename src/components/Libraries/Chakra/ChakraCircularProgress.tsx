import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraCircularProgress() {
  return (
    <ChakraWrapper>
      <CircularProgress value={40}>
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>
    </ChakraWrapper>
  )
}

export const chakraCircularProgressData: TComponentData = {
  name: 'Circular Progress',
  library: 'chakra',
  component: <ChakraCircularProgress />,
  tags: ['chakra', 'circular', 'progress', 'loading'],
  docsLink: 'https://chakra-ui.com/docs/components/circular-progress/usage',
}
