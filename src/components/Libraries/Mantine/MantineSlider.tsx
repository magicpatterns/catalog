import { Slider } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineSlider() {
  return (
    <MantineWrapper>
      <Slider
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </MantineWrapper>
  )
}

export const mantineSliderData: TComponentData = {
  name: 'Slider',
  library: 'mantine',
  component: <MantineSlider />,
  tags: ['mantine', 'slider'],
}
