import { Chip } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineChip() {
  return (
    <MantineWrapper>
      <Chip defaultChecked>Chip</Chip>
    </MantineWrapper>
  )
}

export const mantineChipData: TComponentData = {
  name: 'Chip',
  library: 'mantine',
  component: <MantineChip />,
  tags: ['mantine', 'chip'],
}
