import { ActionIcon } from '@mantine/core'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineActionIcon() {
  return (
    <MantineWrapper>
      <ActionIcon>
        <MagnifyingGlassIcon />
      </ActionIcon>
    </MantineWrapper>
  )
}

export const mantineActionIconData: TComponentData = {
  name: 'Action Icon',
  library: 'mantine',
  component: <MantineActionIcon />,
  tags: ['mantine', 'action', 'icon'],
}
