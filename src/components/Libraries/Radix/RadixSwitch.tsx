import { Flex, Switch, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixSwitch() {
  return (
    <RadixWrapper>
      <Flex>
        <Text size="2">
          <label>
            <Switch mr="2" defaultChecked /> Sync settings{' '}
            <Text color="gray">(Default)</Text>
          </label>
        </Text>
      </Flex>
    </RadixWrapper>
  )
}

export const radixSwitchData: TComponentData = {
  name: 'Switch',
  library: 'radix',
  component: <RadixSwitch />,
  tags: ['radix', 'switch'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/switch',
}
