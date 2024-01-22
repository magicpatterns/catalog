import { Button, useToast } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraToast() {
  const toast = useToast()
  return (
    <ChakraWrapper>
      <Button
        onClick={() =>
          toast({
            title: 'Toast Created.',
            description: 'Here is a Toast!.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
    </ChakraWrapper>
  )
}

export const chakraToastData: TComponentData = {
  name: 'Toast',
  library: 'chakra',
  component: <ChakraToast />,
  tags: ['chakra', 'toast'],
  docsLink: 'https://chakra-ui.com/docs/components/toast/usage',
}
