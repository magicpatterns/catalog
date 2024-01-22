import { MultiSelect } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' },
]

export function MantineMultiSelect() {
  return (
    <MantineWrapper>
      <MultiSelect
        data={data}
        label="Favorite framework?"
        placeholder="Pick all that you like"
      />
    </MantineWrapper>
  )
}

export const mantineMultiSelectData: TComponentData = {
  name: 'Input',
  library: 'mantine',
  component: <MantineMultiSelect />,
  tags: ['mantine', 'multiselect', 'multi'],
}
