import { TComponentData } from '@/types'

import { Textarea } from './raw/ui/textarea'

export function ShadcnTextarea() {
  return <Textarea />
}

export const shadcnTextareaData: TComponentData = {
  name: 'Textarea',
  library: 'shadcn',
  component: <ShadcnTextarea />,
  tags: ['shadcn', 'textarea'],
  docsLink: 'https://ui.shadcn.com/docs/components/textarea',
}
