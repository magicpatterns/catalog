import { Checkbox } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineCheckbox() {
  return (
    <MantineWrapper>
      <Checkbox label="I agree" />
    </MantineWrapper>
  )
}

export const mantineCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'mantine',
  component: <MantineCheckbox />,
  tags: ['mantine', 'checkbox', 'check'],
}
