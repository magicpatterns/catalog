import { Spinner } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraSpinner() {
  return (
    <ChakraWrapper>
      <Spinner />
    </ChakraWrapper>
  )
}

export const chakraSpinnerData: TComponentData = {
  name: 'Spinner',
  library: 'chakra',
  component: <ChakraSpinner />,
  tags: ['chakra', 'spinner', 'loading'],
  docsLink: 'https://chakra-ui.com/docs/components/spinner/usage',
}
