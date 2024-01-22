import { TComponentData } from '@/types'

import { Input } from './raw/ui/input'

export function ShadcnInput() {
  return <Input type="email" placeholder="Email" />
}

export const shadcnInputData: TComponentData = {
  name: 'Input',
  library: 'shadcn',
  component: <ShadcnInput />,
  tags: ['shadcn', 'input'],
  docsLink: 'https://ui.shadcn.com/docs/components/input',
}
