import { Input } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineInput() {
  return (
    <MantineWrapper>
      <Input placeholder="Your Email" />
    </MantineWrapper>
  )
}

export const mantineInputData: TComponentData = {
  name: 'Input',
  library: 'mantine',
  component: <MantineInput />,
  tags: ['mantine', 'input'],
}
