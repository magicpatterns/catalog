import { Select } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixSelect() {
  return (
    <RadixWrapper>
      <Select.Root>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </RadixWrapper>
  )
}

export const radixSelectData: TComponentData = {
  name: 'Select',
  library: 'radix',
  component: <RadixSelect />,
  tags: ['radix', 'select'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/select',
}
