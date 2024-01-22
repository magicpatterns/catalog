import { DatePicker } from 'antd'

import { TComponentData } from '@/types'

export function AntDatePicker() {
  return <DatePicker />
}

export const antDatePickerData: TComponentData = {
  name: 'Date Picker',
  library: 'ant',
  component: <AntDatePicker />,
  tags: ['ant', 'date picker', 'date', 'picker', 'calendar', 'time'],
  docsLink: 'https://ant.design/components/date-picker',
}
