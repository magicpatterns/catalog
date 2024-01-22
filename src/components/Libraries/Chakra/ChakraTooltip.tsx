import { Tooltip } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraTooltip() {
  return (
    <ChakraWrapper>
      <Tooltip label="Hey, I'm here!" aria-label="A tooltip">
        Hover me
      </Tooltip>
    </ChakraWrapper>
  )
}

export const chakraTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'chakra',
  component: <ChakraTooltip />,
  tags: ['chakra', 'tooltip'],
  docsLink: 'https://chakra-ui.com/docs/components/tooltip/usage',
}
