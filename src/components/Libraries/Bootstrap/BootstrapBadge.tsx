import Badge from 'react-bootstrap/Badge'

import { TComponentData } from '@/types'

export function BootstrapBadge() {
  return <Badge bg="secondary">New</Badge>
}

export const bootstrapBadgeData: TComponentData = {
  name: 'Badge',
  library: 'bootstrap',
  component: <BootstrapBadge />,
  tags: ['bootstrap', 'badge'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/badge',
}
