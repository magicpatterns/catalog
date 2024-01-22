import { ColorPicker } from 'antd'

import { TComponentData } from '@/types'

export function AntColorPicker() {
  return <ColorPicker />
}

export const antColorPickerData: TComponentData = {
  name: 'Color Picker',
  library: 'ant',
  component: <AntColorPicker />,
  tags: ['ant', 'color picker', 'color', 'picker', 'hsl', 'rgb', 'hex'],
  docsLink: 'https://ant.design/components/color-picker',
}
