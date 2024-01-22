import { Calendar } from 'antd'

import { TComponentData } from '@/types'

export function AntCalendar() {
  return <Calendar />
}

export const antCalendarData: TComponentData = {
  name: 'Calendar',
  library: 'ant',
  component: <AntCalendar />,
  tags: ['ant', 'calendar', 'dates'],
  docsLink: 'https://ant.design/components/calendar',
}
