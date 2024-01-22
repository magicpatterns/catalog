import { TComponentData } from '@/types'

import { Badge } from './raw/ui/badge'
import { ShadcnWrapper } from './ShadcnWrapper'

export function ShadcnBadge() {
  return <Badge variant="outline">Badge</Badge>
}

export const shadcnBadgeData: TComponentData = {
  name: 'Badge',
  library: 'shadcn',
  component: <ShadcnBadge />,
  tags: ['shadcn', 'badge'],
  docsLink: 'https://ui.shadcn.com/docs/components/badge',
}
