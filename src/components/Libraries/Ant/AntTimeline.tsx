import { Timeline } from 'antd'

import { TComponentData } from '@/types'

export function AntTimeline() {
  return (
    <Timeline
      items={[
        {
          children: 'Event 1',
        },
        {
          children: 'Event 2',
        },
        {
          children: 'Event 3',
        },
      ]}
    />
  )
}

export const antTimelineData: TComponentData = {
  name: 'Timeline',
  library: 'ant',
  component: <AntTimeline />,
  tags: ['ant', 'timeline', 'calendar', 'events', 'history', 'chronology'],
  docsLink: 'https://ant.design/components/timeline',
}
