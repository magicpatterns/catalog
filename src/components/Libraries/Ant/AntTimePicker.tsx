import { TimePicker } from 'antd'

import { TComponentData } from '@/types'

export function AntTimePicker() {
  return <TimePicker />
}

export const antTimePickerData: TComponentData = {
  name: 'Time Picker',
  library: 'ant',
  component: <AntTimePicker />,
  tags: [
    'ant',
    'time picker',
    'time',
    'picker',
    'clock',
    'hour',
    'minute',
    'second',
  ],
  docsLink: 'https://ant.design/components/time-picker',
}
