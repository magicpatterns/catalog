import Rating from '@mui/material/Rating'

import { TComponentData } from '@/types'

export function MuiRating() {
  return <Rating />
}

export const muiRatingData: TComponentData = {
  name: 'Rating',
  library: 'mui',
  component: <MuiRating />,
  tags: ['material ui', 'mui', 'rating'],
}
