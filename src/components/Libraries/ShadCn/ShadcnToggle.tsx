import { Bold } from 'lucide-react'

import { TComponentData } from '@/types'

import { Toggle } from './raw/ui/toggle'

export function ShadcnToggle() {
  return (
    <Toggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}

export const shadcnToggleData: TComponentData = {
  name: 'Toggle',
  library: 'shadcn',
  component: <ShadcnToggle />,
  tags: ['shadcn', 'toggle'],
  docsLink: 'https://ui.shadcn.com/docs/components/toggle',
}
