import { Group, PinInput } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantinePinInput() {
  return (
    <MantineWrapper>
      <Group position="center">
        <PinInput />
      </Group>
    </MantineWrapper>
  )
}

export const mantinePinInput: TComponentData = {
  name: 'Pin Input',
  library: 'mantine',
  component: <MantinePinInput />,
  tags: ['mantine', 'pin', 'input'],
}
