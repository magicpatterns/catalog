import { Select } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraSelect() {
  return (
    <ChakraWrapper>
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </ChakraWrapper>
  )
}

export const chakraSelectData: TComponentData = {
  name: 'Select',
  library: 'chakra',
  component: <ChakraSelect />,
  tags: ['chakra', 'select'],
  docsLink: 'https://chakra-ui.com/docs/components/select/usage',
}
