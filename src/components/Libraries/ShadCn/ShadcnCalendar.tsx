import React from 'react'

import { TComponentData } from '@/types'

import { Calendar } from './raw/ui/calendar'

export function ShadcnCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

export const shadcnCalendarData: TComponentData = {
  name: 'Calendar',
  library: 'shadcn',
  component: <ShadcnCalendar />,
  tags: ['shadcn', 'calendar', 'date', 'time', 'picker'],
  docsLink: 'https://ui.shadcn.com/docs/components/calendar',
}
