import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraNumberInput() {
  return (
    <ChakraWrapper>
      <NumberInput>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </ChakraWrapper>
  )
}

export const chakraNumberInputData: TComponentData = {
  name: 'Number Input',
  library: 'chakra',
  component: <ChakraNumberInput />,
  tags: ['chakra', 'number', 'input'],
  docsLink: 'https://chakra-ui.com/docs/components/number-input/usage',
}
