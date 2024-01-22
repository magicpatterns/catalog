import { Avatar, Badge } from 'antd'

import { TComponentData } from '@/types'

export function AntBadge() {
  return (
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  )
}

export const antBadgeData: TComponentData = {
  name: 'Badge',
  library: 'ant',
  component: <AntBadge />,
  tags: ['ant', 'badge'],
  docsLink: 'https://ant.design/components/badge',
}
