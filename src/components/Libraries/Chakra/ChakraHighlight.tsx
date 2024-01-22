import { Highlight } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraHighlight() {
  return (
    <ChakraWrapper>
      <Highlight
        query="spotlight"
        styles={{ px: '1', py: '1', bg: 'orange.100' }}
      >
        you can spotlight words.
      </Highlight>{' '}
    </ChakraWrapper>
  )
}

export const chakraHighlightData: TComponentData = {
  name: 'Highlight',
  library: 'chakra',
  component: <ChakraHighlight />,
  tags: ['chakra', 'highlight'],
  docsLink: 'https://chakra-ui.com/docs/components/highlight/usage',
}
