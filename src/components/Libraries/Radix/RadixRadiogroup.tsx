import { Flex, RadioGroup, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixRadiogroup() {
  return (
    <RadixWrapper>
      <RadioGroup.Root defaultValue="1">
        <Flex gap="2" direction="column">
          <label>
            <Flex gap="2" align="center">
              <RadioGroup.Item value="1" />
              <Text size="2">Default</Text>
            </Flex>
          </label>
          <label>
            <Flex gap="2" align="center">
              <RadioGroup.Item value="2" />
              <Text size="2">Comfortable</Text>
            </Flex>
          </label>
          <label>
            <Flex gap="2" align="center">
              <RadioGroup.Item value="3" />
              <Text size="2">Compact</Text>
            </Flex>
          </label>
        </Flex>
      </RadioGroup.Root>
    </RadixWrapper>
  )
}

export const radixRadiogroupData: TComponentData = {
  name: 'Radiogroup',
  library: 'radix',
  component: <RadixRadiogroup />,
  tags: ['radix', 'radio group', 'radio', 'group'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/radio-group',
}
