import { Button } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineButton() {
  return (
    <MantineWrapper>
      <Button color="blue">Button</Button>
    </MantineWrapper>
  )
}

export const mantineButtonData: TComponentData = {
  name: 'Button',
  library: 'mantine',
  component: <MantineButton />,
  tags: ['mantine', 'button'],
}
