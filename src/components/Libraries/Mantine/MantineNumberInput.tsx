import { NumberInput } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineNumberInput() {
  return (
    <MantineWrapper>
      <NumberInput
        defaultValue={18}
        placeholder="Your age"
        label="Your age"
        withAsterisk
      />
    </MantineWrapper>
  )
}

export const mantineNumberInputData: TComponentData = {
  name: 'Number Input',
  library: 'mantine',
  component: <MantineNumberInput />,
  tags: ['mantine', 'number', 'input'],
}
