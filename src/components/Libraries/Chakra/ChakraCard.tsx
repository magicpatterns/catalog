import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraCard() {
  return (
    <ChakraWrapper>
      <Card>
        <CardBody>A basic card</CardBody>
      </Card>
    </ChakraWrapper>
  )
}

export const chakraCardData: TComponentData = {
  name: 'Card',
  library: 'chakra',
  component: <ChakraCard />,
  tags: ['chakra', 'card'],
  docsLink: 'https://chakra-ui.com/docs/components/card/usage',
}
