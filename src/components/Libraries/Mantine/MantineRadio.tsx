import { Group, Radio } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineRadio() {
  return (
    <MantineWrapper>
      <Radio.Group name="favoriteFramework" label="Options" withAsterisk>
        <Group mt="xs">
          <Radio value="react" label="One" />
          <Radio value="svelte" label="Two" />
          <Radio value="ng" label="Three" />
        </Group>
      </Radio.Group>{' '}
    </MantineWrapper>
  )
}

export const mantineRadioData: TComponentData = {
  name: 'Radio',
  library: 'mantine',
  component: <MantineRadio />,
  tags: ['mantine', 'radio'],
}
