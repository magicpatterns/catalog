import { SegmentedControl } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineSegmentedControl() {
  return (
    <MantineWrapper>
      <SegmentedControl
        data={[
          { label: 'One', value: 'react' },
          { label: 'Two', value: 'ng' },
          { label: 'Three', value: 'vue' },
        ]}
      />
    </MantineWrapper>
  )
}

export const mantineSegmentedControlData: TComponentData = {
  name: 'Segmented Control',
  library: 'mantine',
  component: <MantineSegmentedControl />,
  tags: ['mantine', 'segmented', 'control'],
}
