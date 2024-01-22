import { Slider } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixSlider() {
  return (
    <RadixWrapper>
      <Slider defaultValue={[50]} />
    </RadixWrapper>
  )
}

export const radixSliderData: TComponentData = {
  name: 'Slider',
  library: 'radix',
  component: <RadixSlider />,
  tags: ['radix', 'slider'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/slider',
}
