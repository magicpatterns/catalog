import { Autocomplete } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineAutocomplete() {
  return (
    <MantineWrapper>
      <Autocomplete
        label="Favorite framework?"
        placeholder="Pick one"
        data={['React', 'Angular', 'Svelte', 'Vue']}
      />
    </MantineWrapper>
  )
}

export const mantineAutocompleteData: TComponentData = {
  name: 'Autocomplete',
  library: 'mantine',
  component: <MantineAutocomplete />,
  tags: ['mantine', 'autocomplete', 'search', 'auto', 'complete'],
}
