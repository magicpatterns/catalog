import { NativeSelect } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineNativeSelect() {
  return (
    <MantineWrapper>
      <NativeSelect
        data={['React', 'Vue', 'Angular', 'Svelte']}
        label="Favorite framework?"
        withAsterisk
      />
    </MantineWrapper>
  )
}

export const mantineNativeSelectData: TComponentData = {
  name: 'Native Select',
  library: 'mantine',
  component: <MantineNativeSelect />,
  tags: ['mantine', 'native', 'select'],
}
