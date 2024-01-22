import { FormControl, FormLabel, Switch } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraSwitch() {
  return (
    <ChakraWrapper>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Toggle
        </FormLabel>
        <Switch id="email-alerts" />
      </FormControl>
    </ChakraWrapper>
  )
}

export const chakraSwitchData: TComponentData = {
  name: 'Switch',
  library: 'chakra',
  component: <ChakraSwitch />,
  tags: ['chakra', 'switch', 'toggle', 'on', 'off'],
  docsLink: 'https://chakra-ui.com/docs/components/switch/usage',
}
