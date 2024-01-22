import { Rating } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineRating() {
  return (
    <MantineWrapper>
      <Rating defaultValue={2} />
    </MantineWrapper>
  )
}

export const mantineRatingData: TComponentData = {
  name: 'Rating',
  library: 'mantine',
  component: <MantineRating />,
  tags: ['mantine', 'rating', 'stars'],
}
