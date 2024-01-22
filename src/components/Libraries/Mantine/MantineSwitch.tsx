import { Switch } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineSwitch() {
  return (
    <MantineWrapper>
      <Switch label="I agree" />
    </MantineWrapper>
  )
}

export const mantineSwitchData: TComponentData = {
  name: 'Switch',
  library: 'mantine',
  component: <MantineSwitch />,
  tags: ['mantine', 'switch'],
}
