import { Button, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

type ISaveButton = ChakraProps

export function SaveButton(props: ISaveButton) {
  return (
    <ChakraProviderWrapper>
      <Button
        {...props}
        bgColor="blue.500"
        _hover={{ backgroundColor: 'blue.600' }}
        color="white"
      >
        Save
      </Button>
    </ChakraProviderWrapper>
  )
}
