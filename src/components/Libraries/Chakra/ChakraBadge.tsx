import { Badge } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraBadge() {
  return (
    <ChakraWrapper>
      <Badge>Default</Badge>
    </ChakraWrapper>
  )
}

export const chakraBadgeData: TComponentData = {
  name: 'Badge',
  library: 'chakra',
  component: <ChakraBadge />,
  tags: ['chakra', 'badge'],
  docsLink: 'https://chakra-ui.com/docs/components/badge/usage',
}
