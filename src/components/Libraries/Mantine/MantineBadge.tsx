import { Badge } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineBadge() {
  return (
    <MantineWrapper>
      <Badge>Badge</Badge>
    </MantineWrapper>
  )
}

export const mantineBadgeData: TComponentData = {
  name: 'Badge',
  library: 'mantine',
  component: <MantineBadge />,
  tags: ['mantine', 'badge'],
}
