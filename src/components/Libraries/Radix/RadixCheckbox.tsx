import { Checkbox, Flex, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixCheckbox() {
  return (
    <RadixWrapper>
      <Flex>
        <Text size="2">
          <label>
            <Checkbox mr="1" defaultChecked /> Agree to Terms and Conditions
          </label>
        </Text>
      </Flex>
    </RadixWrapper>
  )
}

export const radixCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'radix',
  component: <RadixCheckbox />,
  tags: ['radix', 'checkbox'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/checkbox',
}
