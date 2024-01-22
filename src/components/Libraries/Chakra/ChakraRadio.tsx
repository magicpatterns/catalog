import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useState } from 'react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraRadio() {
  const [value, setValue] = useState('1')

  return (
    <ChakraWrapper>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">First</Radio>
          <Radio value="2">Second</Radio>
          <Radio value="3">Third</Radio>
        </Stack>
      </RadioGroup>
    </ChakraWrapper>
  )
}

export const chakraRadioData: TComponentData = {
  name: 'Radio',
  library: 'chakra',
  component: <ChakraRadio />,
  tags: ['chakra', 'radio'],
  docsLink: 'https://chakra-ui.com/docs/components/radio/usage',
}
