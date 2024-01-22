import { TComponentData } from '@/types'

import { Button } from './raw/ui/button'
import { ShadcnWrapper } from './ShadcnWrapper'

export function ShadcnButton() {
  return <Button>Button</Button>
}

export const shadcnButtonData: TComponentData = {
  name: 'Button',
  library: 'shadcn',
  component: <ShadcnButton />,
  tags: ['shadcn', 'button'],
  docsLink: 'https://ui.shadcn.com/docs/components/button',
}
