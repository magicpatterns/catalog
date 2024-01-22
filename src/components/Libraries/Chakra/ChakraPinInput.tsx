import { HStack, PinInput, PinInputField } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraPinInput() {
  return (
    <ChakraWrapper>
      <HStack>
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </ChakraWrapper>
  )
}

export const chakraPinInputData: TComponentData = {
  name: 'Pin Input',
  library: 'chakra',
  component: <ChakraPinInput />,
  tags: ['chakra', 'pin', 'input'],
  docsLink: 'https://chakra-ui.com/docs/components/pin-input/usage',
}
