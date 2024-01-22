import { Select } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineSelect() {
  return (
    <MantineWrapper>
      <Select
        label="Favorite framework?"
        placeholder="Pick one"
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
      />
    </MantineWrapper>
  )
}

export const mantineSelectData: TComponentData = {
  name: 'Select',
  library: 'mantine',
  component: <MantineSelect />,
  tags: ['mantine', 'select'],
}
