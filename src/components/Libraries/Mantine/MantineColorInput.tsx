import { ColorInput } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineColorInput() {
  return (
    <MantineWrapper>
      <ColorInput placeholder="Pick color" label="Your favorite color" />
    </MantineWrapper>
  )
}

export const mantineColorInputData: TComponentData = {
  name: 'Color Input',
  library: 'mantine',
  component: <MantineColorInput />,
  tags: ['mantine', 'color', 'input', 'picker', 'rgb', 'hsl', 'hex'],
}
