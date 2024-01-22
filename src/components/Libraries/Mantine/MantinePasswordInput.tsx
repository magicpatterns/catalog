import { NumberInput, PasswordInput } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantinePasswordInput() {
  return (
    <MantineWrapper>
      <PasswordInput placeholder="Password" label="Password" withAsterisk />
    </MantineWrapper>
  )
}

export const mantinePasswordInputData: TComponentData = {
  name: 'Password Input',
  library: 'mantine',
  component: <MantinePasswordInput />,
  tags: ['mantine', 'password', 'input'],
}
