import { TComponentData } from '@/types'

import { Slider } from './raw/ui/slider'

export function ShadcnSlider() {
  return <Slider defaultValue={[33]} max={100} step={1} />
}

export const shadcnSliderData: TComponentData = {
  name: 'Slider',
  library: 'shadcn',
  component: <ShadcnSlider />,
  tags: ['shadcn', 'slider'],
  docsLink: 'https://ui.shadcn.com/docs/components/slider',
}
