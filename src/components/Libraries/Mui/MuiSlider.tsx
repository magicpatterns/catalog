import Slider from '@mui/material/Slider'

import { TComponentData } from '@/types'

export function MuiSlider() {
  return <Slider aria-label="Volume" />
}

export const muiSliderData: TComponentData = {
  name: 'Slider',
  library: 'mui',
  component: <MuiSlider />,
  tags: ['material ui', 'mui', 'slider'],
}
