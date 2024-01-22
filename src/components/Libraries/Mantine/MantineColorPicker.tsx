import { ColorPicker } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineColorPicker() {
  return (
    <MantineWrapper>
      <ColorPicker format="rgba" />
    </MantineWrapper>
  )
}

export const mantineColorPickerData: TComponentData = {
  name: 'Color Picker',
  library: 'mantine',
  component: <MantineColorPicker />,
  tags: ['mantine', 'color', 'picker'],
}
