import { Slider } from 'antd'

import { TComponentData } from '@/types'

export function AntSlider() {
  return <Slider defaultValue={30} />
}

export const antSliderData: TComponentData = {
  name: 'Slider',
  library: 'ant',
  component: <AntSlider />,
  tags: ['ant', 'slider'],
  docsLink: 'https://ant.design/components/slider',
}
