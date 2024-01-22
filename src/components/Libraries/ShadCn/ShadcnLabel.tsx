import { TComponentData } from '@/types'

import { Label } from './raw/ui/label'

export function ShadcnLabel() {
  return <Label htmlFor="email">Your email address</Label>
}

export const shadcnLabelData: TComponentData = {
  name: 'Label',
  library: 'shadcn',
  component: <ShadcnLabel />,
  tags: ['shadcn', 'label'],
  docsLink: 'https://ui.shadcn.com/docs/components/label',
}
