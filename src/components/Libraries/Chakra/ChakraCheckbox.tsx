import { Checkbox } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraCheckbox() {
  return (
    <ChakraWrapper>
      <Checkbox defaultChecked>Checkbox</Checkbox>{' '}
    </ChakraWrapper>
  )
}

export const chakraCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'chakra',
  component: <ChakraCheckbox />,
  tags: ['chakra', 'checkbox', 'check', 'box'],
  docsLink: 'https://chakra-ui.com/docs/components/checkbox/usage',
}
