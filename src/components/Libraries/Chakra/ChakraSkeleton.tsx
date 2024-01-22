import { Skeleton } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraSkeleton() {
  return (
    <ChakraWrapper>
      <Skeleton height="20px" width="100px" />
    </ChakraWrapper>
  )
}

export const chakraSkeletonData: TComponentData = {
  name: 'Skeleton',
  library: 'chakra',
  component: <ChakraSkeleton />,
  tags: ['chakra', 'skeleton', 'loading'],
  docsLink: 'https://chakra-ui.com/docs/components/skeleton/usage',
}
